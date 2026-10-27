import { createAppError, err, ok } from '@model/common';
import type { Clock } from '@model/common';
import { compareLocal } from '@utils/localDateTime';
import { DEFAULT_NOTIFICATION_PREFERENCES } from '../../model/notifications/Notification';
import type {
  AppNotification,
  NotificationPreferences,
} from '../../model/notifications/Notification';
import type { NotificationRepository } from '../../model/notifications/NotificationRepository';
import { createSeedNotifications } from '../../mocks/notifications/notifications.mock';

export function createMockNotificationRepository(
  clock: Clock,
): NotificationRepository {
  let items: AppNotification[] = createSeedNotifications(clock.now());
  let preferences: NotificationPreferences = DEFAULT_NOTIFICATION_PREFERENCES;
  let sequence = 1;
  const listeners = new Set<() => void>();
  const notify = () => listeners.forEach(listener => listener());

  return {
    async list() {
      return ok(
        [...items].sort((a, b) => compareLocal(b.createdAt, a.createdAt)),
      );
    },

    async markRead(id) {
      if (!items.some(item => item.id === id)) {
        return err(createAppError('not_found', 'Notification not found'));
      }
      items = items.map(item =>
        item.id === id ? { ...item, read: true } : item,
      );
      notify();
      return ok(undefined);
    },

    async markAllRead() {
      items = items.map(item => ({ ...item, read: true }));
      notify();
      return ok(undefined);
    },

    async add(input) {
      const created: AppNotification = {
        ...input,
        id: `ntf-new-${sequence++}`,
        createdAt: clock.now(),
        read: false,
      };
      items = [created, ...items];
      notify();
      return ok(created);
    },

    async getPreferences() {
      return ok(preferences);
    },

    async updatePreferences(patch) {
      preferences = { ...preferences, ...patch };
      notify();
      return ok(preferences);
    },

    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}
