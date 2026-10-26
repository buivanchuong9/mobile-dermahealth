import { useCallback } from 'react';
import { ok } from '@core/contracts';
import type { AppError, Result } from '@core/contracts';
import { useAsyncQuery } from '@shared/hooks';
import type { Appointment } from '../../domain/entities/Appointment';
import type { AppointmentRepository } from '../../domain/repositories/AppointmentRepository';

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
