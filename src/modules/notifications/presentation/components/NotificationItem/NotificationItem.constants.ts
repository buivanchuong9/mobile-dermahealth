import type { IconName } from '@design-system/primitives';
import type { NotificationKind } from '../../../domain/entities/Notification';

export const KIND_ICON: Record<NotificationKind, IconName> = {
  appointment_reminder: 'calendar-clock',
  queue_update: 'ticket',
  follow_up_reminder: 'history',
  system: 'info',
};
