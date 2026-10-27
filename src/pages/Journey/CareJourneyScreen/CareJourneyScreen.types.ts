import type { Clock } from '@model/common';
import type { Appointment, AppointmentRepository } from '@pages/Appointments';
import type { QueueRepository } from '@pages/Queue';
import type { NextJourneyAction } from '../../../model/journey/CareJourney';

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
