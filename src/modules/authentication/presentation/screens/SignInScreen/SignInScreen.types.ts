import type { AuthSession } from '../../../domain/entities/AuthSession';
import type { AuthService } from '../../../domain/services/AuthService';

export type SignInScreenProps = {
  readonly authService: AuthService;
  readonly onSignedIn: (session: AuthSession) => void;
  readonly onBack: () => void;
  readonly onForgotPassword: () => void;
  readonly onRegister: () => void;
  /** Public demo credentials to show as a hint; the hint is hidden if omitted. */
  readonly demoAccountHint?: {
    readonly email: string;
    readonly password: string;
  };
};
