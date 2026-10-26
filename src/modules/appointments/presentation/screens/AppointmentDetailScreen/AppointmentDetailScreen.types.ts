import type { Clock } from '@core/contracts';
import type { Appointment } from '../../../domain/entities/Appointment';
import type { AppointmentRepository } from '../../../domain/repositories/AppointmentRepository';

export type AppointmentDetailScreenProps = {
  readonly repository: AppointmentRepository;
  readonly clock: Clock;
  readonly appointmentId: string;
  readonly onBack: () => void;
  readonly onReschedule: (appointmentId: string) => void;
  readonly onCheckedIn: (appointment: Appointment) => void;
};
