import type { ReactNode } from 'react';

export type CardProps = {
  readonly children: ReactNode;
  readonly testID?: string;
};
