import type { ReactNode } from 'react';

export type SectionCardProps = {
  readonly title: string;
  readonly subtitle?: string;
  readonly children: ReactNode;
  readonly testID?: string;
};
