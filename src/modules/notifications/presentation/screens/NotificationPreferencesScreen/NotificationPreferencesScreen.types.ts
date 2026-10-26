import type { NotificationRepository } from '../../../domain/repositories/NotificationRepository';

export type NotificationPreferencesScreenProps = {
  readonly repository: NotificationRepository;
  readonly onBack: () => void;
};
