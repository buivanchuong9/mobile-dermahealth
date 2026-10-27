import { addDays, toDateKey } from '@utils/localDateTime';
import type { LocalDateTime } from '@utils/localDateTime';
import { translate } from '@i18n';
import type { AppNotification } from '../../model/notifications/Notification';

export function createSeedNotifications(now: LocalDateTime): AppNotification[] {
  const today = toDateKey(now);
  return [
    {
      id: 'ntf-reminder',
      kind: 'appointment_reminder',
      title: translate('notifications.seeded.reminderTitle'),
      body: translate('notifications.seeded.reminderBody'),
      createdAt: `${today}T07:30`,
      read: false,
    },
    {
      id: 'ntf-follow-up',
      kind: 'follow_up_reminder',
      title: translate('notifications.seeded.followUpTitle'),
      body: translate('notifications.seeded.followUpBody'),
      createdAt: `${addDays(today, -1)}T18:00`,
      read: false,
    },
    {
      id: 'ntf-welcome',
      kind: 'system',
      title: translate('notifications.seeded.welcomeTitle'),
      body: translate('notifications.seeded.welcomeBody'),
      createdAt: `${addDays(today, -3)}T09:00`,
      read: true,
    },
  ];
}
