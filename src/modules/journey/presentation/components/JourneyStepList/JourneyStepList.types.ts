import type { Appointment } from '@modules/appointments';
import type { QueueSnapshot } from '@modules/queue';
import type { CareJourney } from '../../../domain/entities/CareJourney';

export type JourneyStepListProps = {
  readonly journey: CareJourney;
  readonly appointment: Appointment;
  readonly queue: QueueSnapshot | null;
};
