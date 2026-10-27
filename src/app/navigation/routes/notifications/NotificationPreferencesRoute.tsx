import { NotificationPreferencesScreen } from '@pages/Notifications';
import { useAppServices } from '../../../../contexts/AppServicesProvider';
import { useRootNavigation } from '../../hooks/useRootNavigation';

export function NotificationPreferencesRoute() {
  const navigation = useRootNavigation();
  const services = useAppServices();
  return (
    <NotificationPreferencesScreen
      repository={services.notifications}
      onBack={navigation.goBack}
    />
  );
}
