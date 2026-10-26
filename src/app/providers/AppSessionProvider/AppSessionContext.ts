import { createContext } from 'react';
import type { AppSession } from './AppSessionProvider.types';

export const AppSessionContext = createContext<AppSession | null>(null);
