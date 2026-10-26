import type { AppNotification } from '@modules/notifications';

export type ReminderListProps = {
  readonly notifications: readonly AppNotification[];
  readonly onOpenNotifications: () => void;
};
