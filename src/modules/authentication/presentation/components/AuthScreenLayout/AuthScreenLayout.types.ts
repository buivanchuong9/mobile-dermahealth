import type { ReactNode } from 'react';

export type AuthScreenLayoutProps = {
  readonly title: string;
  readonly subtitle?: string;
  readonly onBack?: () => void;
  readonly children: ReactNode;
};
