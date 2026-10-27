import type { AuthService } from '../../../model/authentication/AuthService';

export type ForgotPasswordScreenProps = {
  readonly authService: AuthService;
  readonly onBack: () => void;
};
