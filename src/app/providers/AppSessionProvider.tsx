import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import type { AuthSession } from '@modules/authentication';

export type AppSession = {
  /** In-memory only: onboarding shows again after the app restarts. */
  readonly onboardingCompleted: boolean;
  readonly session: AuthSession | null;
  readonly completeOnboarding: () => void;
  readonly signIn: (session: AuthSession) => void;
  readonly signOut: () => void;
};

const AppSessionContext = createContext<AppSession | null>(null);

export function AppSessionProvider({
  children,
}: {
  readonly children: ReactNode;
}) {
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  const [session, setSession] = useState<AuthSession | null>(null);

  const completeOnboarding = useCallback(
    () => setOnboardingCompleted(true),
    [],
  );
  const signIn = useCallback((value: AuthSession) => setSession(value), []);
  const signOut = useCallback(() => setSession(null), []);

  const value = useMemo<AppSession>(
    () => ({
      onboardingCompleted,
      session,
      completeOnboarding,
      signIn,
      signOut,
    }),
    [onboardingCompleted, session, completeOnboarding, signIn, signOut],
  );
  return (
    <AppSessionContext.Provider value={value}>
      {children}
    </AppSessionContext.Provider>
  );
}

export function useAppSession(): AppSession {
  const value = useContext(AppSessionContext);
  if (value === null) {
    throw new Error('useAppSession must be used inside an AppSessionProvider');
  }
  return value;
}
