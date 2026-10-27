import type { ReactNode } from 'react';

export type TimelineStatus = 'completed' | 'current' | 'upcoming' | 'blocked';

export type TimelineItemProps = {
  readonly status: TimelineStatus;
  /** Spoken and shown next to the title so state is not color-only. */
  readonly statusLabel: string;
  readonly title: string;
  readonly description?: string;
  readonly meta?: string;
  readonly isLast?: boolean;
  readonly children?: ReactNode;
  readonly testID?: string;
};
