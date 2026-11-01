import { useState } from 'react';
import { SwitchRow } from '@components/inputs';
import { Button, Typography } from '@components/primitives';
import { SectionCard } from '@components/surfaces';
import { translate } from '@i18n';
import type { AlertSettingsProps } from './AlertSettings.types';

export function AlertSettings({
  settings,
  onChange,
  onTestSound,
}: AlertSettingsProps) {
  const [testing, setTesting] = useState(false);
  const [failed, setFailed] = useState(false);
  const test = async () => {
    if (testing) return;
    setTesting(true);
    try {
      setFailed(!(await onTestSound()));
    } catch {
      setFailed(true);
    } finally {
      setTesting(false);
    }
  };
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
      <SwitchRow
        label={translate('queue.alerts.vibration')}
        value={settings.vibration}
        onValueChange={value => onChange({ ...settings, vibration: value })}
        testID="queue-alert-vibration"
      />
      <Button
        label={translate('queue.alerts.testSound')}
        variant="secondary"
        onPress={test}
        loading={testing}
        fullWidth
        testID="queue-test-sound"
      />
      {failed ? (
        <Typography variant="caption" tone="error" accessibilityRole="alert">
          {translate('queue.alerts.testFailed')}
        </Typography>
      ) : null}
    </SectionCard>
  );
}
