import { createAppError, err, ok } from '@core/contracts';
import { DEMO_PATIENT } from '@core/demo';
import type { AuthService } from '../domain/services/AuthService';

/** Demo credentials shown on the sign-in screen; they unlock nothing real. */
const DEMO_PASSWORD = 'Demo@1234';
const TAKEN_EMAIL = 'taken@dermahealth.vn';
const OFFLINE_EMAIL = 'offline@dermahealth.vn';
const LATENCY_MS = 500;

const wait = () =>
  new Promise<void>(resolve => setTimeout(resolve, LATENCY_MS));

/**
 * Deterministic simulation. Credentials are compared in memory and discarded;
 * nothing is stored, logged or sent anywhere.
 */
export function createMockAuthService(): AuthService {
  return {
    async signIn({ email, password }) {
      await wait();
      const normalized = email.trim().toLowerCase();
      if (normalized === OFFLINE_EMAIL) {
        return err(createAppError('unavailable', 'Simulated outage'));
      }
      if (normalized === DEMO_PATIENT.email && password === DEMO_PASSWORD) {
        return ok({
          userId: DEMO_PATIENT.id,
          fullName: DEMO_PATIENT.fullName,
          email: DEMO_PATIENT.email,
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
      if (normalized === TAKEN_EMAIL || normalized === DEMO_PATIENT.email) {
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
