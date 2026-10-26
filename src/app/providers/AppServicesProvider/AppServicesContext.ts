import { createContext } from 'react';
import type { AppServices } from '../../composition/createAppServices';

export const AppServicesContext = createContext<AppServices | null>(null);
