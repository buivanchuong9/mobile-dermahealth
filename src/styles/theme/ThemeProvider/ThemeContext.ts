import { createContext } from 'react';
import type { Theme } from '../Theme.types';

export const ThemeContext = createContext<Theme | null>(null);
