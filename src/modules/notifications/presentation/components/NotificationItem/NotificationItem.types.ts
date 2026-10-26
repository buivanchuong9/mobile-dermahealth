import type { LocalDateTime } from '@shared/utilities/localDateTime';
import type { AppNotification } from '../../../domain/entities/Notification';

export type NotificationItemProps = {
  readonly notification: AppNotification;
  readonly now: LocalDateTime;
  readonly onPress: (notification: AppNotification) => void;
};
