import { OnboardingScreen } from '@modules/onboarding';
import { useAppSession } from '../../../providers/AppSessionProvider';

export function OnboardingRoute() {
  const { completeOnboarding } = useAppSession();
  return <OnboardingScreen onFinish={completeOnboarding} />;
}
