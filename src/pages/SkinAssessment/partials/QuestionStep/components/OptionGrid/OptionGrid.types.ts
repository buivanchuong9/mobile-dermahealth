import type { ReactNode } from 'react';

export type OptionGridProps = {
  /** Each child becomes one half-width cell; give children stable keys. */
  readonly children: ReactNode;
};
