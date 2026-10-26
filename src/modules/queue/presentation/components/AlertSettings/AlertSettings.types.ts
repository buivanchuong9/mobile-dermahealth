import type { QueueAlertSettings } from '../../../domain/entities/Queue';

export type AlertSettingsProps = {
  readonly settings: QueueAlertSettings;
  readonly onChange: (settings: QueueAlertSettings) => void;
};
