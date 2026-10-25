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

/** Loads everything the dashboard shows and refreshes when any source changes. */
export function useDashboardData({
  appointments,
  queue,
  notifications,
  records,
}: DashboardRepositories) {
  const load = useCallback(async () => {
    const [appointmentList, snapshot, notificationList, recordList] =
      await Promise.all([
        appointments.list(),
        queue.getSnapshot(),
        notifications.list(),
        records.list(),
      ]);
    if (!appointmentList.ok) {
      return err(appointmentList.error);
    }
    if (!snapshot.ok) {
      return err(snapshot.error);
    }
    if (!notificationList.ok) {
      return err(notificationList.error);
    }
    if (!recordList.ok) {
      return err(recordList.error);
    }
    const visits = recordList.value.filter(
      (entry): entry is VisitRecord => entry.kind === 'visit',
    );
    return ok({
      appointments: appointmentList.value,
      queue: snapshot.value,
      notifications: notificationList.value,
      visits,
    });
  }, [appointments, queue, notifications, records]);

  const subscribe = useCallback(
    (listener: () => void) => {
      const stops = [
        appointments.subscribe(listener),
        queue.subscribe(listener),
        notifications.subscribe(listener),
      ];
      return () => stops.forEach(stop => stop());
    },
    [appointments, queue, notifications],
  );

  return useAsyncQuery(load, subscribe);
}
