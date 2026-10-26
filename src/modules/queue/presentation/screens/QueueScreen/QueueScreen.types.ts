import type { QueueAlertSettings } from '../../../domain/entities/Queue';
import type { QueueRepository } from '../../../domain/repositories/QueueRepository';

export type QueueScreenProps = {
  readonly repository: QueueRepository;
  readonly alertSettings: QueueAlertSettings;
  readonly onChangeAlertSettings: (settings: QueueAlertSettings) => void;
  readonly onBack: () => void;
  readonly onOpenAppointments: () => void;
  readonly onOpenJourney: () => void;
};
