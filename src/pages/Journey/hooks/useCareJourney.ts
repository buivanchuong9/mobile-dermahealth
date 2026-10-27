import { useCallback } from 'react';
import { err, ok } from '@model/common';
import type { Clock } from '@model/common';
import type { AppointmentRepository } from '@pages/Appointments';
import type { QueueRepository } from '@pages/Queue';
import { useAsyncQuery } from '@hooks';
import {
  buildCareJourney,
  selectJourneyAppointment,
} from '../../../utils/journey/careJourneyRules';

export function useCareJourney(
  appointments: AppointmentRepository,
  queue: QueueRepository,
  clock: Clock,
) {
  const load = useCallback(async () => {
    const [appointmentList, snapshot] = await Promise.all([
      appointments.list(),
      queue.getSnapshot(),
    ]);
    if (!appointmentList.ok) {
      return err(appointmentList.error);
    }
    if (!snapshot.ok) {
      return err(snapshot.error);
    }
    const appointment = selectJourneyAppointment(
      appointmentList.value,
      snapshot.value,
    );
    if (appointment === null) {
      return ok(null);
    }
    return ok({
      appointment,
      queue: snapshot.value,
      journey: buildCareJourney({
        appointment,
        queue: snapshot.value,
        now: clock.now(),
      }),
    });
  }, [appointments, queue, clock]);

  const subscribe = useCallback(
    (listener: () => void) => {
      const stopAppointments = appointments.subscribe(listener);
      const stopQueue = queue.subscribe(listener);
      return () => {
        stopAppointments();
        stopQueue();
      };
    },
    [appointments, queue],
  );

  return useAsyncQuery(load, subscribe);
}
