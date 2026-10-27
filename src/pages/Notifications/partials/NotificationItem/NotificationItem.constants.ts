import type { IconName } from '@components/primitives';
import type { NotificationKind } from '../../../../model/notifications/Notification';

export const KIND_ICON: Record<NotificationKind, IconName> = {
  appointment_reminder: 'calendar-clock',
  queue_update: 'ticket',
  follow_up_reminder: 'history',
  system: 'info',
};
