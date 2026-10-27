import { createAppError, err, ok } from '@model/common';
import { DEMO_PATIENT } from '@mocks/demo';
import type { AuthService } from '../../model/authentication/AuthService';

const TAKEN_EMAIL = 'taken@dermahealth.vn';
const OFFLINE_EMAIL = 'offline@dermahealth.vn';
const DEFAULT_LATENCY_MS = 500;

export type MockAuthServiceOptions = {
  /** Public demo credentials; `null` means no account can sign in. */
  readonly demoAccount: {
    readonly email: string;
    readonly password: string;
  } | null;
  readonly latencyMs?: number;
};

/**
 * Deterministic simulation. Credentials are compared in memory and discarded;
 * nothing is stored, logged or sent anywhere.
 */
export function createMockAuthService({
  demoAccount,
  latencyMs = DEFAULT_LATENCY_MS,
}: MockAuthServiceOptions): AuthService {
  const wait = () =>
    new Promise<void>(resolve => setTimeout(resolve, latencyMs));
  const demoEmail = demoAccount?.email.toLowerCase() ?? null;

  return {
    async signIn({ email, password }) {
      await wait();
      const normalized = email.trim().toLowerCase();
      if (normalized === OFFLINE_EMAIL) {
        return err(createAppError('unavailable', 'Simulated outage'));
      }
      if (
        demoAccount !== null &&
        normalized === demoEmail &&
        password === demoAccount.password
      ) {
        return ok({
          userId: DEMO_PATIENT.id,
          fullName: DEMO_PATIENT.fullName,
          email: demoAccount.email,
        });
      }
      return err(createAppError('permission_denied', 'Invalid credentials'));
    },

    async register({ fullName, email }) {
      await wait();
      const normalized = email.trim().toLowerCase();
      if (normalized === OFFLINE_EMAIL) {
        return err(createAppError('unavailable', 'Simulated outage'));
      }
      if (normalized === TAKEN_EMAIL || normalized === demoEmail) {
        return err(createAppError('validation', 'Email already registered'));
      }
      return ok({
        userId: 'patient-new',
        fullName: fullName.trim(),
        email: normalized,
      });
    },

    async requestPasswordReset(email) {
      await wait();
      return email.trim().toLowerCase() === OFFLINE_EMAIL
        ? err(createAppError('unavailable', 'Simulated outage'))
        : ok(undefined);
    },
  };
}
