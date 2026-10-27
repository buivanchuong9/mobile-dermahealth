import { WelcomeScreen } from '@pages/Authentication';
import { useRootNavigation } from '../../hooks/useRootNavigation';

export function WelcomeRoute() {
  const navigation = useRootNavigation();
  return (
    <WelcomeScreen
      onSignIn={() => navigation.navigate('SignIn')}
      onRegister={() => navigation.navigate('Register')}
    />
  );
}
