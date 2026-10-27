import { NotificationCenterScreen } from '@pages/Notifications';
import { useAppServices } from '../../../../contexts/AppServicesProvider';
import { useRootNavigation } from '../../hooks/useRootNavigation';

export function NotificationsRoute() {
  const navigation = useRootNavigation();
  const services = useAppServices();
  return (
    <NotificationCenterScreen
      repository={services.notifications}
      clock={services.clock}
      onBack={navigation.goBack}
      onOpenPreferences={() => navigation.navigate('NotificationPreferences')}
      onOpenNotification={notification => {
        if (notification.kind === 'queue_update') {
          navigation.navigate('Queue');
        } else if (notification.kind !== 'system') {
          navigation.navigate('Main', { screen: 'Appointments' });
        }
      }}
    />
  );
}
