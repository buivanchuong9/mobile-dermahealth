import type { TimelineStatus } from '../../TimelineItem.types';

export type TimelineRailProps = {
  readonly status: TimelineStatus;
  /** The last item has no connecting line below its dot. */
  readonly isLast: boolean;
};
