import { createContext } from 'react';
import type { AppServices } from '../../app/composition/createAppServices';

export const AppServicesContext = createContext<AppServices | null>(null);
