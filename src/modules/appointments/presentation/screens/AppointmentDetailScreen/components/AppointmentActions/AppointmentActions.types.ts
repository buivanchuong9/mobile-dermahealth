import type { Appointment } from '../../../../../domain/entities/Appointment';
import type { ChangeBlockReason } from '../../../../../domain/rules/appointmentRules';

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
