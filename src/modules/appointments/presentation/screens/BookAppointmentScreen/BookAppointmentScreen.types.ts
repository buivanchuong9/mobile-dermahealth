import type { Clock } from '@core/contracts';
import type { Appointment } from '../../../domain/entities/Appointment';
import type { AppointmentRepository } from '../../../domain/repositories/AppointmentRepository';
import type { BookingMode } from '../../hooks/useBookingForm.types';

export type BookAppointmentScreenProps = {
  readonly repository: AppointmentRepository;
  readonly clock: Clock;
  readonly mode: BookingMode;
  readonly onBack: () => void;
  readonly onCompleted: (appointment: Appointment) => void;
};
