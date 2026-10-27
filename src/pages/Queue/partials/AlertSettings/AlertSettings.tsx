import { SwitchRow } from '@components/inputs';
import { SectionCard } from '@components/surfaces';
import { translate } from '@i18n';
import type { AlertSettingsProps } from './AlertSettings.types';

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
