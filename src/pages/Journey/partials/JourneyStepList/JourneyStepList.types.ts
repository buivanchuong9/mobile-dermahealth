import type { Appointment } from '@pages/Appointments';
import type { QueueSnapshot } from '@pages/Queue';
import type { CareJourney } from '../../../../model/journey/CareJourney';

export type JourneyStepListProps = {
  readonly journey: CareJourney;
  readonly appointment: Appointment;
  readonly queue: QueueSnapshot | null;
};
