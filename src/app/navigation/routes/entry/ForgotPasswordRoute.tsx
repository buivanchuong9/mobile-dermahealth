import { ForgotPasswordScreen } from '@modules/authentication';
import { useAppServices } from '../../../providers/AppServicesProvider';
import { useRootNavigation } from '../../hooks/useRootNavigation';

export function ForgotPasswordRoute() {
  const navigation = useRootNavigation();
  const { auth } = useAppServices();
  return <ForgotPasswordScreen authService={auth} onBack={navigation.goBack} />;
}
