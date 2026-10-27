import type { Clock } from '@model/common';
import type { Appointment } from '../../../model/appointments/Appointment';
import type { AppointmentRepository } from '../../../model/appointments/AppointmentRepository';

export type AppointmentDetailScreenProps = {
  readonly repository: AppointmentRepository;
  readonly clock: Clock;
  readonly appointmentId: string;
  readonly onBack: () => void;
  readonly onReschedule: (appointmentId: string) => void;
  readonly onCheckedIn: (appointment: Appointment) => void;
};
