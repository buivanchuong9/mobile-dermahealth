import { useCallback, useState } from 'react';
import { Button, Typography } from '@components/primitives';
import { Banner, SkeletonGroup, SkeletonRow } from '@components/feedback';
import { SwitchRow } from '@components/inputs';
import { ScreenHeader } from '@components/navigation';
import { ScreenContainer, SectionCard } from '@components/surfaces';
import { translate } from '@i18n';
import { useAsyncQuery } from '@hooks';
import type { NotificationPreferences } from '../../../model/notifications/Notification';
import type { NotificationPreferencesScreenProps } from './NotificationPreferencesScreen.types';

export function NotificationPreferencesScreen({
  repository,
  onTestSound,
  onBack,
}: NotificationPreferencesScreenProps) {
  const load = useCallback(() => repository.getPreferences(), [repository]);
  const query = useAsyncQuery(load, repository.subscribe);
  const set = (patch: Partial<NotificationPreferences>) => {
    repository.updatePreferences(patch);
  };

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
    <ScreenContainer
      header={
        <ScreenHeader
          title={translate('notifications.preferences.title')}
          onBack={onBack}
        />
      }
    >
      <Banner
        tone="warning"
        message={translate('notifications.preferences.previewNote')}
        testID="notification-preview-note"
      />
      {query.status !== 'ready' ? (
        <SkeletonGroup>
          {Array.from({ length: 4 }, (_, index) => (
            <SkeletonRow key={index} leading="none" lines={2} trailing />
          ))}
        </SkeletonGroup>
      ) : (
        <>
          <SectionCard title={translate('notifications.preferences.topics')}>
            <SwitchRow
              label={translate(
                'notifications.preferences.appointmentReminders',
              )}
              description={translate(
                'notifications.preferences.appointmentRemindersHint',
              )}
              value={query.data.appointmentReminders}
              onValueChange={value => set({ appointmentReminders: value })}
              testID="pref-appointment"
            />
            <SwitchRow
              label={translate('notifications.preferences.queueUpdates')}
              description={translate(
                'notifications.preferences.queueUpdatesHint',
              )}
              value={query.data.queueUpdates}
              onValueChange={value => set({ queueUpdates: value })}
              testID="pref-queue"
            />
            <SwitchRow
              label={translate('notifications.preferences.followUpReminders')}
              description={translate(
                'notifications.preferences.followUpRemindersHint',
              )}
              value={query.data.followUpReminders}
              onValueChange={value => set({ followUpReminders: value })}
              testID="pref-follow-up"
            />
          </SectionCard>
          <SectionCard title={translate('notifications.preferences.sound')}>
            <SwitchRow
              label={translate('notifications.preferences.alertSound')}
              description={translate(
                'notifications.preferences.alertSoundHint',
              )}
              value={query.data.alertSound}
              onValueChange={value => set({ alertSound: value })}
              testID="pref-sound"
            />
            <SwitchRow
              label={translate('notifications.preferences.alertVibration')}
              description={translate(
                'notifications.preferences.alertVibrationHint',
              )}
              value={query.data.alertVibration}
              onValueChange={value => set({ alertVibration: value })}
              testID="pref-vibration"
            />
            <Button
              label={translate('notifications.preferences.testSound')}
              variant="secondary"
              onPress={test}
              loading={testing}
              fullWidth
              testID="pref-test-sound"
            />
            {failed ? (
              <Typography
                variant="caption"
                tone="error"
                accessibilityRole="alert"
              >
                {translate('queue.alerts.testFailed')}
              </Typography>
            ) : null}
          </SectionCard>
        </>
      )}
    </ScreenContainer>
  );
}
