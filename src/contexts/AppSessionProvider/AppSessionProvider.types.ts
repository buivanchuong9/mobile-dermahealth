import type { ReactNode } from 'react';
import type { AuthSession } from '@pages/Authentication';

export type AppSession = {
  /** In-memory only: onboarding shows again after the app restarts. */
  readonly onboardingCompleted: boolean;
  readonly session: AuthSession | null;
  readonly completeOnboarding: () => void;
  readonly signIn: (session: AuthSession) => void;
  readonly signOut: () => void;
};

export type AppSessionProviderProps = {
  readonly children: ReactNode;
};
