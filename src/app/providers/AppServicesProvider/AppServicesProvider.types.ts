import type { ReactNode } from 'react';
import type { AppServices } from '../../composition/createAppServices';

export type AppServicesProviderProps = {
  /** Inject services in tests or previews; defaults to the simulated set. */
  readonly services?: AppServices;
  readonly children: ReactNode;
};
