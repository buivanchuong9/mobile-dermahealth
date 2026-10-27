import { OnboardingScreen } from '@pages/Onboarding';
import { useAppSession } from '../../../../contexts/AppSessionProvider';

export function OnboardingRoute() {
  const { completeOnboarding } = useAppSession();
  return <OnboardingScreen onFinish={completeOnboarding} />;
}
