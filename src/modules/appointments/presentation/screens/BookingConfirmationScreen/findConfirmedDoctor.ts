import type { Appointment, Doctor } from '../../../domain/entities/Appointment';

/** Builds the summary's doctor line from the appointment's own snapshot. */
export function findConfirmedDoctor(appointment: Appointment): Doctor {
  return {
    id: appointment.doctorId,
    name: appointment.doctorName,
    title: appointment.department,
    specialtyId: appointment.specialtyId,
  };
}
