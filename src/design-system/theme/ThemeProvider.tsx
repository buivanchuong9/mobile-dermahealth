import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { lightTheme } from './lightTheme';
import type { Theme } from './Theme.types';

const ThemeContext = createContext<Theme | null>(null);

export type ThemeProviderProps = {
  readonly theme?: Theme;
  readonly children: ReactNode;
};

export function ThemeProvider({
  theme = lightTheme,
  children,
}: ThemeProviderProps) {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): Theme {
  const theme = useContext(ThemeContext);
  if (theme === null) {
    throw new Error('useTheme must be used inside a ThemeProvider');
  }
  return theme;
}
