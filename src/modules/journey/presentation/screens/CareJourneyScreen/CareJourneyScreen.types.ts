import type { Clock } from '@core/contracts';
import type { Appointment, AppointmentRepository } from '@modules/appointments';
import type { QueueRepository } from '@modules/queue';
import type { NextJourneyAction } from '../../../domain/entities/CareJourney';

export type CareJourneyScreenProps = {
  readonly appointmentRepository: AppointmentRepository;
  readonly queueRepository: QueueRepository;
  readonly clock: Clock;
  readonly onBookAppointment: () => void;
  /** Called with the next action and the appointment it applies to. */
  readonly onNextAction: (
    action: NextJourneyAction,
    appointment: Appointment,
  ) => void;
};
