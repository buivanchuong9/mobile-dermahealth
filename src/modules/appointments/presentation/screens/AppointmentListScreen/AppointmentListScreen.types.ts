import type { AppointmentRepository } from '../../../domain/repositories/AppointmentRepository';

export type AppointmentListScreenProps = {
  readonly repository: AppointmentRepository;
  readonly onOpenAppointment: (appointmentId: string) => void;
  readonly onBookAppointment: () => void;
};
