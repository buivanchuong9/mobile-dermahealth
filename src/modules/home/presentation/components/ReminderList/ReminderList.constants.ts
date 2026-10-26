import type { AppNotification } from '@modules/notifications';
import type { IconName } from '@design-system/primitives';

export const MAX_ITEMS = 2;

export const ICON: Record<AppNotification['kind'], IconName> = {
  appointment_reminder: 'calendar-clock',
  queue_update: 'ticket',
  follow_up_reminder: 'history',
  system: 'info',
};
