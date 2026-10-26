import type { ReactNode } from 'react';
import type { AsyncQueryState } from '@shared/hooks';

export type AsyncStateViewProps<T, E> = {
  readonly state: AsyncQueryState<T, E>;
  /** Content-shaped placeholder shown for the initial load or a retry. */
  readonly loading: ReactNode;
  readonly errorTitle?: string;
  readonly errorDescription?: string;
  readonly onRetry: () => void;
  readonly errorTestID?: string;
  /** Renders the loaded data; stays mounted across background refreshes. */
  readonly children: (data: T) => ReactNode;
};
