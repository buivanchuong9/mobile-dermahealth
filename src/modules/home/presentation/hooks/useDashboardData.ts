import { useCallback } from 'react';
import { err, ok } from '@core/contracts';
import type { AppointmentRepository } from '@modules/appointments';
import type { RecordRepository, VisitRecord } from '@modules/medical-records';
import type { NotificationRepository } from '@modules/notifications';
import type { QueueRepository } from '@modules/queue';
import { useAsyncQuery } from '@shared/hooks';

export type DashboardRepositories = {
  readonly appointments: AppointmentRepository;
  readonly queue: QueueRepository;
  readonly notifications: NotificationRepository;
  readonly records: RecordRepository;
};

/**
 * One independent query per dashboard source, so each section shows its own
 * placeholder, error and retry and appears as soon as its data is ready.
 * Appointments, queue and notifications refresh when their repository pushes.
 */
export function useDashboardData({
  appointments,
  queue,
  notifications,
  records,
}: DashboardRepositories) {
  const loadAppointments = useCallback(
    () => appointments.list(),
    [appointments],
  );
  const subscribeAppointments = useCallback(
    (listener: () => void) => appointments.subscribe(listener),
    [appointments],
  );
  const loadQueue = useCallback(() => queue.getSnapshot(), [queue]);
  const subscribeQueue = useCallback(
    (listener: () => void) => queue.subscribe(listener),
    [queue],
  );
  const loadNotifications = useCallback(
    () => notifications.list(),
    [notifications],
  );
  const subscribeNotifications = useCallback(
    (listener: () => void) => notifications.subscribe(listener),
    [notifications],
  );
  const loadVisits = useCallback(async () => {
    const result = await records.list();
    return result.ok
      ? ok(
          result.value.filter(
            (entry): entry is VisitRecord => entry.kind === 'visit',
          ),
        )
      : err(result.error);
  }, [records]);

  return {
    appointments: useAsyncQuery(loadAppointments, subscribeAppointments),
    queue: useAsyncQuery(loadQueue, subscribeQueue),
    notifications: useAsyncQuery(loadNotifications, subscribeNotifications),
    visits: useAsyncQuery(loadVisits),
  };
}
