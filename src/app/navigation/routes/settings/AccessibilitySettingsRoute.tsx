import { AccessibilitySettingsScreen } from '@pages/Settings';
import { useRootNavigation } from '../../hooks/useRootNavigation';

export function AccessibilitySettingsRoute() {
  const navigation = useRootNavigation();
  return <AccessibilitySettingsScreen onBack={navigation.goBack} />;
}
