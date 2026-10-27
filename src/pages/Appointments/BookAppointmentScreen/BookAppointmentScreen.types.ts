import type { Clock } from '@model/common';
import type { Appointment } from '../../../model/appointments/Appointment';
import type { AppointmentRepository } from '../../../model/appointments/AppointmentRepository';
import type { BookingMode } from '../hooks/useBookingForm.types';

export type BookAppointmentScreenProps = {
  readonly repository: AppointmentRepository;
  readonly clock: Clock;
  readonly mode: BookingMode;
  readonly onBack: () => void;
  readonly onCompleted: (appointment: Appointment) => void;
};
