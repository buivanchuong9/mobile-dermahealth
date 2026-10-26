import { useCallback } from 'react';
import { ok } from '@core/contracts';
import type { AppError, Result } from '@core/contracts';
import { useAsyncQuery } from '@shared/hooks';
import type { LocalDateKey } from '@shared/utilities/localDateTime';
import type { TimeSlot } from '../../domain/entities/Appointment';
import type { AppointmentRepository } from '../../domain/repositories/AppointmentRepository';

/** Available time slots for a doctor on a day; refreshes when bookings change. */
export function useBookingSlots(
  repository: AppointmentRepository,
  doctorId: string | null,
  dateKey: LocalDateKey,
) {
  const load = useCallback(
    async (): Promise<Result<readonly TimeSlot[], AppError>> =>
      doctorId === null
        ? ok([])
        : repository.getAvailability(doctorId, dateKey),
    [repository, doctorId, dateKey],
  );
  return useAsyncQuery(load, repository.subscribe);
}
