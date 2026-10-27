import type { LocalDateTime } from '@utils/localDateTime';
import type { AppNotification } from '../../../../model/notifications/Notification';

export type NotificationItemProps = {
  readonly notification: AppNotification;
  readonly now: LocalDateTime;
  readonly onPress: (notification: AppNotification) => void;
};
