import { useCallback } from 'react';
import { ok } from '@model/common';
import type { AppError, Result } from '@model/common';
import { useAsyncQuery } from '@hooks';
import type { LocalDateKey } from '@utils/localDateTime';
import type { TimeSlot } from '../../../model/appointments/Appointment';
import type { AppointmentRepository } from '../../../model/appointments/AppointmentRepository';

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
