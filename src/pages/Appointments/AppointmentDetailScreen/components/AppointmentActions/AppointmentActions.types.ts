import type { Appointment } from '../../../../../model/appointments/Appointment';
import type { ChangeBlockReason } from '../../../../../utils/appointments/appointmentRules';

export type AppointmentActionsProps = {
  readonly appointment: Appointment;
  readonly canCheckIn: boolean;
  readonly checkingIn: boolean;
  /** Why rescheduling and cancelling are unavailable, or `null` when allowed. */
  readonly changeBlockReason: ChangeBlockReason | null;
  readonly onCheckIn: () => void;
  readonly onReschedule: () => void;
  readonly onRequestCancel: () => void;
};
