import { SignInScreen } from '@modules/authentication';
import { appConfig } from '../../../configuration';
import { useAppServices } from '../../../providers/AppServicesProvider';
import { useAppSession } from '../../../providers/AppSessionProvider';
import { useRootNavigation } from '../../hooks/useRootNavigation';

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
      demoAccountHint={appConfig.demoAccount ?? undefined}
    />
  );
}
