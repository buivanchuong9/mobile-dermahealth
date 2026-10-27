import type { AppointmentRepository } from '../../../model/appointments/AppointmentRepository';

export type BookingConfirmationScreenProps = {
  readonly repository: AppointmentRepository;
  readonly appointmentId: string;
  readonly rescheduled: boolean;
  readonly onViewDetail: (appointmentId: string) => void;
  readonly onGoHome: () => void;
};
