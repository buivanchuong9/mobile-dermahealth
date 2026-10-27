import type { AppNotification } from '@pages/Notifications';

export type ReminderListProps = {
  readonly notifications: readonly AppNotification[];
  readonly onOpenNotifications: () => void;
};
