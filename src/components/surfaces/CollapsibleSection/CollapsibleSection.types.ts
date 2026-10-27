import type { ReactNode } from 'react';

export type CollapsibleSectionProps = {
  readonly title: string;
  readonly children: ReactNode;
  readonly defaultExpanded?: boolean;
  readonly testID?: string;
};
