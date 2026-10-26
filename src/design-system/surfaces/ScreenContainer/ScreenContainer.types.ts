import type { ReactNode } from 'react';

export type ScreenContainerProps = {
  readonly children: ReactNode;
  readonly header?: ReactNode;
  /** Pinned below the content, above the keyboard (for primary actions). */
  readonly footer?: ReactNode;
  readonly scroll?: boolean;
  readonly background?: 'primary' | 'secondary';
  /** Set to false when a tab bar already covers the bottom safe area. */
  readonly bottomInset?: boolean;
  readonly testID?: string;
};
