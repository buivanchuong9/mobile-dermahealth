import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GuideScreen } from '@modules/onboarding';
import {
  NotificationCenterScreen,
  NotificationPreferencesScreen,
} from '@modules/notifications';
import { AccessibilitySettingsScreen, PrivacyScreen } from '@modules/settings';
import { SkinProfileScreen } from '@modules/skin-profile';
import { useTheme } from '@design-system/theme';
import { useAppServices } from '../../providers/AppServicesProvider';
import { BackBar } from '../BackBar';
import { useRootNavigation } from '../useRootNavigation';

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

export function SkinProfileRoute() {
  const navigation = useRootNavigation();
  const services = useAppServices();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.fill,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          backgroundColor: theme.colors.background.primary,
        },
      ]}
    >
      <BackBar onPress={navigation.goBack} />
      <SkinProfileScreen useCases={services.skinProfile} />
    </View>
  );
}

export function GuideRoute() {
  const navigation = useRootNavigation();
  return <GuideScreen onBack={navigation.goBack} />;
}

export function PrivacyRoute() {
  const navigation = useRootNavigation();
  return <PrivacyScreen onBack={navigation.goBack} />;
}

export function AccessibilitySettingsRoute() {
  const navigation = useRootNavigation();
  return <AccessibilitySettingsScreen onBack={navigation.goBack} />;
}

const styles = StyleSheet.create({ fill: { flex: 1 } });
