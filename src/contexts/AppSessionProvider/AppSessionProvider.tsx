import { useCallback, useMemo, useState } from 'react';
import type { AuthSession } from '@pages/Authentication';
import { AppSessionContext } from './AppSessionContext';
import type {
  AppSession,
  AppSessionProviderProps,
} from './AppSessionProvider.types';

export function AppSessionProvider({ children }: AppSessionProviderProps) {
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
