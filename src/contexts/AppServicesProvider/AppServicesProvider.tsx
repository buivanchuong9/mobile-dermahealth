import { useState } from 'react';
import { createAppServices } from '../../app/composition/createAppServices';
import type { AppServices } from '../../app/composition/createAppServices';
import { AppServicesContext } from './AppServicesContext';
import type { AppServicesProviderProps } from './AppServicesProvider.types';

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
