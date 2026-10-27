import { PrivacyScreen } from '@pages/Settings';
import { useRootNavigation } from '../../hooks/useRootNavigation';

export function PrivacyRoute() {
  const navigation = useRootNavigation();
  return <PrivacyScreen onBack={navigation.goBack} />;
}
