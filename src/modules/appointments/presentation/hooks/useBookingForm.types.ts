import type { Clock } from '@core/contracts';
import type {
  Appointment,
  SpecialtyId,
} from '../../domain/entities/Appointment';
import type { AppointmentRepository } from '../../domain/repositories/AppointmentRepository';

export type BookingMode =
  | {
      readonly type: 'new';
      /** Preselects a specialty, for example from an assessment suggestion. */
      readonly specialtyId?: SpecialtyId;
      readonly followUp?: {
        readonly visitId: string;
        readonly specialtyId?: SpecialtyId;
        readonly doctorId?: string;
      };
    }
  | { readonly type: 'reschedule'; readonly appointmentId: string };

export type BookingFormOptions = {
  readonly repository: AppointmentRepository;
  readonly clock: Clock;
  readonly mode: BookingMode;
  readonly onCompleted: (appointment: Appointment) => void;
};
