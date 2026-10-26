import type { LocalDateTime } from '@shared/utilities/localDateTime';
import type { AppNotification } from '../../../../../domain/entities/Notification';

export type NotificationGroupProps = {
  readonly title: string;
  readonly notifications: readonly AppNotification[];
  readonly now: LocalDateTime;
  readonly onPress: (notification: AppNotification) => void;
};
