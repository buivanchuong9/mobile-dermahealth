import { RegisterScreen } from '@pages/Authentication';
import { useAppServices } from '../../../../contexts/AppServicesProvider';
import { useAppSession } from '../../../../contexts/AppSessionProvider';
import { useRootNavigation } from '../../hooks/useRootNavigation';

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
