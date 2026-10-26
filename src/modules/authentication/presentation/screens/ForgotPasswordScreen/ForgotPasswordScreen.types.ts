import type { AuthService } from '../../../domain/services/AuthService';

export type ForgotPasswordScreenProps = {
  readonly authService: AuthService;
  readonly onBack: () => void;
};
