import type { QueueAlertSettings } from '../../../../model/queue/Queue';

export type AlertSettingsProps = {
  readonly settings: QueueAlertSettings;
  readonly onChange: (settings: QueueAlertSettings) => void;
  readonly onTestSound: () => Promise<boolean>;
};
