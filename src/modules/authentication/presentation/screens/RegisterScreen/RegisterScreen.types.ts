import type { AuthSession } from '../../../domain/entities/AuthSession';
import type { AuthService } from '../../../domain/services/AuthService';

export type RegisterScreenProps = {
  readonly authService: AuthService;
  readonly onRegistered: (session: AuthSession) => void;
  readonly onBack: () => void;
  readonly onSignIn: () => void;
};
