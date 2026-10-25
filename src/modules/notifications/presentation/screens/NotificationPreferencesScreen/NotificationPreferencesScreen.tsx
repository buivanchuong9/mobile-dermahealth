import { useCallback } from 'react';
import { Banner, SkeletonCard } from '@design-system/feedback';
import { SwitchRow } from '@design-system/inputs';
import { ScreenHeader } from '@design-system/navigation';
import { ScreenContainer, SectionCard } from '@design-system/surfaces';
import { translate } from '@shared/localization';
import { useAsyncQuery } from '@shared/hooks';
import type { NotificationPreferences } from '../../../domain/entities/Notification';
import type { NotificationRepository } from '../../../domain/repositories/NotificationRepository';

export type NotificationPreferencesScreenProps = {
  readonly repository: NotificationRepository;
  readonly onBack: () => void;
};

export function NotificationPreferencesScreen({
  repository,
  onBack,
}: NotificationPreferencesScreenProps) {
  const load = useCallback(() => repository.getPreferences(), [repository]);
  const query = useAsyncQuery(load, repository.subscribe);
  const set = (patch: Partial<NotificationPreferences>) => {
    repository.updatePreferences(patch);
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
        <SkeletonCard lines={4} />
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
              label={translate('notifications.preferences.alertVibration')}
              description={translate(
                'notifications.preferences.alertVibrationHint',
              )}
              value={query.data.alertVibration}
              onValueChange={value => set({ alertVibration: value })}
              testID="pref-vibration"
            />
          </SectionCard>
        </>
      )}
    </ScreenContainer>
  );
}
