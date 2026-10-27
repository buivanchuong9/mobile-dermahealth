import { useCallback } from 'react';
import { useAsyncQuery } from '@hooks';
import type { SpecialtyId } from '../../../model/appointments/Appointment';
import type { AppointmentRepository } from '../../../model/appointments/AppointmentRepository';

export type BookingDoctorsOptions = {
  readonly repository: AppointmentRepository;
  /** Specialty to list; ignored when rescheduling (all doctors are listed). */
  readonly specialtyId: SpecialtyId;
  readonly isReschedule: boolean;
  /** Doctor fixed by the appointment being rescheduled. */
  readonly lockedDoctorId: string | null;
  /** Doctor the patient picked, if still valid for the specialty. */
  readonly pickedDoctorId: string | null;
};

/** Doctor list for the chosen specialty and the effective selected doctor. */
export function useBookingDoctors({
  repository,
  specialtyId,
  isReschedule,
  lockedDoctorId,
  pickedDoctorId,
}: BookingDoctorsOptions) {
  const load = useCallback(
    () => repository.listDoctors(isReschedule ? undefined : specialtyId),
    [repository, specialtyId, isReschedule],
  );
  const doctors = useAsyncQuery(load);
  const list = doctors.status === 'ready' ? doctors.data : [];

  const doctorId =
    lockedDoctorId ??
    (pickedDoctorId !== null && list.some(item => item.id === pickedDoctorId)
      ? pickedDoctorId
      : list[0]?.id ?? null);
  const doctor = list.find(item => item.id === doctorId) ?? null;

  return { doctors, doctorId, doctor };
}
