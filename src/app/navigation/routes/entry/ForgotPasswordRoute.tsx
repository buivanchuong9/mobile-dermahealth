import { ForgotPasswordScreen } from '@pages/Authentication';
import { useAppServices } from '../../../../contexts/AppServicesProvider';
import { useRootNavigation } from '../../hooks/useRootNavigation';

export function ForgotPasswordRoute() {
  const navigation = useRootNavigation();
  const { auth } = useAppServices();
  return <ForgotPasswordScreen authService={auth} onBack={navigation.goBack} />;
}
