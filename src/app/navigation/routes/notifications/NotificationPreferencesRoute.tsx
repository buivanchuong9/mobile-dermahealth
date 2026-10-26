import { NotificationPreferencesScreen } from '@modules/notifications';
import { useAppServices } from '../../../providers/AppServicesProvider';
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
