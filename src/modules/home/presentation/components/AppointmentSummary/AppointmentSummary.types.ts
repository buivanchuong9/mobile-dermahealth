import type { Appointment } from '@modules/appointments';

export type AppointmentSummaryProps = {
  readonly appointments: readonly Appointment[];
  readonly onOpenAppointment: (appointmentId: string) => void;
  readonly onOpenAppointments: () => void;
  readonly onBookAppointment: () => void;
};
