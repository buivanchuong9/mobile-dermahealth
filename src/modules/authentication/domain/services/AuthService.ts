import type { AppError, Result } from '@core/contracts';
import type {
  AuthSession,
  RegistrationInput,
  SignInInput,
} from '../entities/AuthSession';

/**
 * Boundary for authentication. The only implementation today is a local
 * simulation; a real one must never log or persist the password it receives.
 *
 * Error codes: `permission_denied` (wrong credentials), `validation` (email
 * already registered), `unavailable` (service down).
 */
export interface AuthService {
  signIn(input: SignInInput): Promise<Result<AuthSession, AppError>>;
  register(input: RegistrationInput): Promise<Result<AuthSession, AppError>>;
  requestPasswordReset(email: string): Promise<Result<void, AppError>>;
}
