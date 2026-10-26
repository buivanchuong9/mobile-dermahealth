import type { Appointment } from '../../../domain/entities/Appointment';

export type AppointmentCardProps = {
  readonly appointment: Appointment;
  readonly onPress: (appointmentId: string) => void;
};
