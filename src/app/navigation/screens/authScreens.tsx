import { OnboardingScreen } from '@modules/onboarding';
import {
  ForgotPasswordScreen,
  RegisterScreen,
  SignInScreen,
  WelcomeScreen,
} from '@modules/authentication';
import { useAppServices } from '../../providers/AppServicesProvider';
import { useAppSession } from '../../providers/AppSessionProvider';
import { useRootNavigation } from '../useRootNavigation';

export function OnboardingRoute() {
  const { completeOnboarding } = useAppSession();
  return <OnboardingScreen onFinish={completeOnboarding} />;
}

export function WelcomeRoute() {
  const navigation = useRootNavigation();
  return (
    <WelcomeScreen
      onSignIn={() => navigation.navigate('SignIn')}
      onRegister={() => navigation.navigate('Register')}
    />
  );
}

export function SignInRoute() {
  const navigation = useRootNavigation();
  const { auth } = useAppServices();
  const { signIn } = useAppSession();
  return (
    <SignInScreen
      authService={auth}
      onSignedIn={signIn}
      onBack={navigation.goBack}
      onForgotPassword={() => navigation.navigate('ForgotPassword')}
      onRegister={() => navigation.replace('Register')}
    />
  );
}

export function RegisterRoute() {
  const navigation = useRootNavigation();
  const { auth } = useAppServices();
  const { signIn } = useAppSession();
  return (
    <RegisterScreen
      authService={auth}
      onRegistered={signIn}
      onBack={navigation.goBack}
      onSignIn={() => navigation.replace('SignIn')}
    />
  );
}

export function ForgotPasswordRoute() {
  const navigation = useRootNavigation();
  const { auth } = useAppServices();
  return <ForgotPasswordScreen authService={auth} onBack={navigation.goBack} />;
}
