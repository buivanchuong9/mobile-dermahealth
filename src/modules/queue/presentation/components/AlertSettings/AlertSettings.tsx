import { SwitchRow } from '@design-system/inputs';
import { SectionCard } from '@design-system/surfaces';
import { translate } from '@shared/localization';
import type { QueueAlertSettings } from '../../../domain/entities/Queue';

export type AlertSettingsProps = {
  readonly settings: QueueAlertSettings;
  readonly onChange: (settings: QueueAlertSettings) => void;
};

export function AlertSettings({ settings, onChange }: AlertSettingsProps) {
  return (
    <SectionCard title={translate('queue.alerts.title')}>
      <SwitchRow
        label={translate('queue.alerts.notifications')}
        description={translate('queue.alerts.notificationsHint')}
        value={settings.notifications}
        onValueChange={value => onChange({ ...settings, notifications: value })}
        testID="queue-alert-notifications"
      />
      <SwitchRow
        label={translate('queue.alerts.sound')}
        description={translate('queue.alerts.soundHint')}
        value={settings.sound}
        onValueChange={value => onChange({ ...settings, sound: value })}
        testID="queue-alert-sound"
      />
    </SectionCard>
  );
}
