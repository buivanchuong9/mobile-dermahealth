import type { IconName } from '../../../../primitives';
import type { TimelineStatus } from '../../TimelineItem.types';

export const STATUS_ICON: Record<TimelineStatus, IconName> = {
  completed: 'check',
  current: 'clock',
  upcoming: 'circle',
  blocked: 'lock',
};
