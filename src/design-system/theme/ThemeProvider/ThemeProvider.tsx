import { lightTheme } from '../lightTheme';
import { ThemeContext } from './ThemeContext';
import type { ThemeProviderProps } from './ThemeProvider.types';

export function ThemeProvider({
  theme = lightTheme,
  children,
}: ThemeProviderProps) {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}
