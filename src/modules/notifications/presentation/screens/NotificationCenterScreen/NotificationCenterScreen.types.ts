import type { Clock } from '@core/contracts';
import type { AppNotification } from '../../../domain/entities/Notification';
import type { NotificationRepository } from '../../../domain/repositories/NotificationRepository';

export type NotificationCenterScreenProps = {
  readonly repository: NotificationRepository;
  readonly clock: Clock;
  readonly onBack: () => void;
  readonly onOpenPreferences: () => void;
  /** Lets the app route to the screen a notification refers to. */
  readonly onOpenNotification: (notification: AppNotification) => void;
};
