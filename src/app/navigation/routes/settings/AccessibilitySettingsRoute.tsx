import { AccessibilitySettingsScreen } from '@modules/settings';
import { useRootNavigation } from '../../hooks/useRootNavigation';

export function AccessibilitySettingsRoute() {
  const navigation = useRootNavigation();
  return <AccessibilitySettingsScreen onBack={navigation.goBack} />;
}
