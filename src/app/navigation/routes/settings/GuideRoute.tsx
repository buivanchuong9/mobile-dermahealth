import { GuideScreen } from '@pages/Onboarding';
import { useRootNavigation } from '../../hooks/useRootNavigation';

export function GuideRoute() {
  const navigation = useRootNavigation();
  return <GuideScreen onBack={navigation.goBack} />;
}
