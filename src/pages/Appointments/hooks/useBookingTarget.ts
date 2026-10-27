import { useCallback } from 'react';
import { ok } from '@model/common';
import type { AppError, Result } from '@model/common';
import { useAsyncQuery } from '@hooks';
import type { Appointment } from '../../../model/appointments/Appointment';
import type { AppointmentRepository } from '../../../model/appointments/AppointmentRepository';

/** Loads the appointment being rescheduled (nothing for a new booking). */
export function useBookingTarget(
  repository: AppointmentRepository,
  rescheduleId: string | null,
) {
  const load = useCallback(
    async (): Promise<Result<Appointment | null, AppError>> =>
      rescheduleId === null ? ok(null) : repository.get(rescheduleId),
    [repository, rescheduleId],
  );
  const target = useAsyncQuery(load);
  const lockedAppointment = target.status === 'ready' ? target.data : null;
  return { target, lockedAppointment };
}
