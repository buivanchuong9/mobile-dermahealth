import type { QueueAlertSettings } from '../../../model/queue/Queue';
import type { QueueRepository } from '../../../model/queue/QueueRepository';

export type QueueScreenProps = {
  readonly repository: QueueRepository;
  readonly alertSettings: QueueAlertSettings;
  readonly onChangeAlertSettings: (settings: QueueAlertSettings) => void;
  readonly onBack: () => void;
  readonly onOpenAppointments: () => void;
  readonly onOpenJourney: () => void;
  /** Interval of the simulation's auto-run; the module default applies if omitted. */
  readonly autoStepMs?: number;
};
