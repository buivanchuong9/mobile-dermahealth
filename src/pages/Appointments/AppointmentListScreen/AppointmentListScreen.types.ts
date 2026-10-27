import type { AppointmentRepository } from '../../../model/appointments/AppointmentRepository';

export type AppointmentListScreenProps = {
  readonly repository: AppointmentRepository;
  readonly onOpenAppointment: (appointmentId: string) => void;
  readonly onBookAppointment: () => void;
};
