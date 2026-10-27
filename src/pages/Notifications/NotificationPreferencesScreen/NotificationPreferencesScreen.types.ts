import type { NotificationRepository } from '../../../model/notifications/NotificationRepository';

export type NotificationPreferencesScreenProps = {
  readonly repository: NotificationRepository;
  readonly onBack: () => void;
};
