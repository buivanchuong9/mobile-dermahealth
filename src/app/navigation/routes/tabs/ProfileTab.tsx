import { ProfileScreen } from '@modules/settings';
import { useAppSession } from '../../../providers/AppSessionProvider';
import { useAppActions } from '../../hooks/useAppActions';
import { useRootNavigation } from '../../hooks/useRootNavigation';

export function ProfileTab() {
  const navigation = useRootNavigation();
  const { session, signOut } = useAppSession();
  const app = useAppActions();
  return (
    <ProfileScreen
      fullName={session?.fullName ?? ''}
      email={session?.email ?? ''}
      onOpenSkinProfile={app.openSkinProfile}
      onOpenNotificationPreferences={() =>
        navigation.navigate('NotificationPreferences')
      }
      onOpenAssessmentHistory={() => navigation.navigate('AssessmentHistory')}
      onOpenGuide={app.openGuide}
      onOpenPrivacy={() => navigation.navigate('Privacy')}
      onOpenAccessibility={() => navigation.navigate('AccessibilitySettings')}
      onSignOut={signOut}
    />
  );
}
