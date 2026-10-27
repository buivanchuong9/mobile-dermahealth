import { useCallback, useEffect, useRef, useState } from 'react';
import type { SkinProfile, SkinProfileUseCases } from '@pages/SkinProfile';

export type SkinProfileSummaryState =
  | { readonly status: 'loading' }
  | { readonly status: 'failed' }
  | { readonly status: 'ready'; readonly profile: SkinProfile | null };

/** Read-only view of the saved Skin Profile for the Home screen. */
export function useSkinProfileSummary(
  useCases: SkinProfileUseCases,
): SkinProfileSummaryState {
  const [state, setState] = useState<SkinProfileSummaryState>({
    status: 'loading',
  });
  const mounted = useRef(true);

  const load = useCallback(async () => {
    const result = await useCases.load();
    if (!mounted.current) {
      return;
    }
    setState(
      result.ok
        ? { status: 'ready', profile: result.value }
        : { status: 'failed' },
    );
  }, [useCases]);

  useEffect(() => {
    mounted.current = true;
    load();
    return () => {
      mounted.current = false;
    };
  }, [load]);

  return state;
}
