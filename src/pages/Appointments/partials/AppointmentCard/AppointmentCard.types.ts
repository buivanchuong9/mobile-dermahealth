import type { Appointment } from '../../../../model/appointments/Appointment';

export type AppointmentCardProps = {
  readonly appointment: Appointment;
  readonly onPress: (appointmentId: string) => void;
};
