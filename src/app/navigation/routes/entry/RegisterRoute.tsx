import { RegisterScreen } from '@modules/authentication';
import { useAppServices } from '../../../providers/AppServicesProvider';
import { useAppSession } from '../../../providers/AppSessionProvider';
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
