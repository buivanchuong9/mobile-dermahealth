import { useCallback, useEffect, useRef, useState } from 'react';

type Outcome<T, E> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly error: E };

export type AsyncQueryState<T, E> =
  | { readonly status: 'loading' }
  | { readonly status: 'error'; readonly error: E }
  | { readonly status: 'ready'; readonly data: T };

export type AsyncQuery<T, E> = AsyncQueryState<T, E> & {
  /** True while a background refresh runs; the previous data stays visible. */
  readonly refreshing: boolean;
  /** Shows the loading state again and re-runs the query (retry). */
  readonly reload: () => void;
};

/**
 * Runs `load` on mount and whenever it changes, and again each time
 * `subscribe` notifies (repositories use this to push in-memory updates).
 * Stale or unmounted results are ignored. `load` must be referentially stable.
 */
export function useAsyncQuery<T, E>(
  load: () => Promise<Outcome<T, E>>,
  subscribe?: (listener: () => void) => () => void,
): AsyncQuery<T, E> {
  const [state, setState] = useState<AsyncQueryState<T, E>>({
    status: 'loading',
  });
  const [refreshing, setRefreshing] = useState(false);
  const requestId = useRef(0);

  const run = useCallback(
    async (showLoading: boolean) => {
      const current = ++requestId.current;
      if (showLoading) {
        setState({ status: 'loading' });
      } else {
        setRefreshing(true);
      }
      const outcome = await load();
      if (current !== requestId.current) {
        return;
      }
      setRefreshing(false);
      setState(
        outcome.ok
          ? { status: 'ready', data: outcome.value }
          : { status: 'error', error: outcome.error },
      );
    },
    [load],
  );

  useEffect(() => {
    run(true);
    const unsubscribe = subscribe?.(() => {
      run(false);
    });
    return () => {
      requestId.current += 1;
      unsubscribe?.();
    };
  }, [run, subscribe]);

  const reload = useCallback(() => {
    run(true);
  }, [run]);

  return { ...state, refreshing, reload };
}
