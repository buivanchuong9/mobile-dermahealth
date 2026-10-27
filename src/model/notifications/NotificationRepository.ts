import type { AppError, Result } from '@model/common';
import type {
  AppNotification,
  NewNotification,
  NotificationPreferences,
} from './Notification';

export interface NotificationRepository {
  list(): Promise<Result<readonly AppNotification[], AppError>>;
  markRead(id: string): Promise<Result<void, AppError>>;
  markAllRead(): Promise<Result<void, AppError>>;
  add(
    notification: NewNotification,
  ): Promise<Result<AppNotification, AppError>>;
  getPreferences(): Promise<Result<NotificationPreferences, AppError>>;
  updatePreferences(
    patch: Partial<NotificationPreferences>,
  ): Promise<Result<NotificationPreferences, AppError>>;
  subscribe(listener: () => void): () => void;
}
