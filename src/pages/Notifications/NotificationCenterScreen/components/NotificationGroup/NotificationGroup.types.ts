import type { LocalDateTime } from '@utils/localDateTime';
import type { AppNotification } from '../../../../../model/notifications/Notification';

export type NotificationGroupProps = {
  readonly title: string;
  readonly notifications: readonly AppNotification[];
  readonly now: LocalDateTime;
  readonly onPress: (notification: AppNotification) => void;
};
