import type { AuthSession } from '../../../model/authentication/AuthSession';
import type { AuthService } from '../../../model/authentication/AuthService';

export type RegisterScreenProps = {
  readonly authService: AuthService;
  readonly onRegistered: (session: AuthSession) => void;
  readonly onBack: () => void;
  readonly onSignIn: () => void;
};
