import type { ReactNode } from 'react';

export type ScreenHeaderProps = {
  readonly title: string;
  readonly subtitle?: string;
  /** Shows a back button when provided. */
  readonly onBack?: () => void;
  readonly right?: ReactNode;
};
