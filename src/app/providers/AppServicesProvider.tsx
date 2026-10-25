import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { createAppServices } from '../composition/createAppServices';
import type { AppServices } from '../composition/createAppServices';

const AppServicesContext = createContext<AppServices | null>(null);

export type AppServicesProviderProps = {
  /** Inject services in tests or previews; defaults to the simulated set. */
  readonly services?: AppServices;
  readonly children: ReactNode;
};

export function AppServicesProvider({
  services,
  children,
}: AppServicesProviderProps) {
  const [value] = useState<AppServices>(() => services ?? createAppServices());
  return (
    <AppServicesContext.Provider value={value}>
      {children}
    </AppServicesContext.Provider>
  );
}

export function useAppServices(): AppServices {
  const services = useContext(AppServicesContext);
  if (services === null) {
    throw new Error(
      'useAppServices must be used inside an AppServicesProvider',
    );
  }
  return services;
}
