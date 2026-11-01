import { useCallback } from 'react';
import { QueueScreen } from '@pages/Queue';
import type { QueueAlertSettings } from '@pages/Queue';
import { useAsyncQuery } from '@hooks';
import { appConfig } from '../../../../configs/appConfig';
import { useAppServices } from '../../../../contexts/AppServicesProvider';
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
          sound: preferences.data.alertSound,
          vibration: preferences.data.alertVibration,
        }
      : { notifications: true, sound: true, vibration: true };

  return (
    <QueueScreen
      repository={services.queue}
      alertSettings={settings}
      autoStepMs={appConfig.simulation.queueAutoStepMs}
      onChangeAlertSettings={next => {
        services.notifications.updatePreferences({
          queueUpdates: next.notifications,
          alertSound: next.sound,
          alertVibration: next.vibration,
        });
      }}
      onTestSound={services.testQueueAlert}
      onBack={navigation.goBack}
      onOpenAppointments={() =>
        navigation.navigate('Main', { screen: 'Appointments' })
      }
      onOpenJourney={() => navigation.navigate('Main', { screen: 'Journey' })}
    />
  );
}
