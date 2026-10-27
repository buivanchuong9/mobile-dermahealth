import type { Clock } from '@model/common';
import type { AppNotification } from '../../../model/notifications/Notification';
import type { NotificationRepository } from '../../../model/notifications/NotificationRepository';

export type NotificationCenterScreenProps = {
  readonly repository: NotificationRepository;
  readonly clock: Clock;
  readonly onBack: () => void;
  readonly onOpenPreferences: () => void;
  /** Lets the app route to the screen a notification refers to. */
  readonly onOpenNotification: (notification: AppNotification) => void;
};
