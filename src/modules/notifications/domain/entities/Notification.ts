import type { LocalDateTime } from '@shared/utilities/localDateTime';

export type NotificationKind =
  | 'appointment_reminder'
  | 'queue_update'
  | 'follow_up_reminder'
  | 'system';

/** Every notification in this build is simulated; none comes from the OS. */
export type AppNotification = {
  readonly id: string;
  readonly kind: NotificationKind;
  readonly title: string;
  readonly body: string;
  readonly createdAt: LocalDateTime;
  readonly read: boolean;
};

export type NewNotification = Omit<
  AppNotification,
  'id' | 'createdAt' | 'read'
>;

export type NotificationPreferences = {
  readonly appointmentReminders: boolean;
  readonly queueUpdates: boolean;
  readonly followUpReminders: boolean;
  readonly alertVibration: boolean;
};

export const DEFAULT_NOTIFICATION_PREFERENCES: NotificationPreferences = {
  appointmentReminders: true,
  queueUpdates: true,
  followUpReminders: true,
  alertVibration: true,
};
