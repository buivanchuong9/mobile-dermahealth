import { useCallback } from 'react';
import { QueueScreen } from '@modules/queue';
import type { QueueAlertSettings } from '@modules/queue';
import { useAsyncQuery } from '@shared/hooks';
import { appConfig } from '../../../configuration';
import { useAppServices } from '../../../providers/AppServicesProvider';
import { useRootNavigation } from '../../hooks/useRootNavigation';

export function QueueRoute() {
  const navigation = useRootNavigation();
  const services = useAppServices();

  const loadPreferences = useCallback(
    () => services.notifications.getPreferences(),
    [services.notifications],
  );
  const preferences = useAsyncQuery(
    loadPreferences,
    services.notifications.subscribe,
  );
  const settings: QueueAlertSettings =
    preferences.status === 'ready'
      ? {
          notifications: preferences.data.queueUpdates,
          sound: preferences.data.alertVibration,
        }
      : { notifications: true, sound: true };

  return (
    <QueueScreen
      repository={services.queue}
      alertSettings={settings}
      autoStepMs={appConfig.simulation.queueAutoStepMs}
      onChangeAlertSettings={next => {
        services.notifications.updatePreferences({
          queueUpdates: next.notifications,
          alertVibration: next.sound,
        });
      }}
      onBack={navigation.goBack}
      onOpenAppointments={() =>
        navigation.navigate('Main', { screen: 'Appointments' })
      }
      onOpenJourney={() => navigation.navigate('Main', { screen: 'Journey' })}
    />
  );
}
