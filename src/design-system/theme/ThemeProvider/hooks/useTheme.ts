import { useContext } from 'react';
import type { Theme } from '../../Theme.types';
import { ThemeContext } from '../ThemeContext';

export function useTheme(): Theme {
  const theme = useContext(ThemeContext);
  if (theme === null) {
    throw new Error('useTheme must be used inside a ThemeProvider');
  }
  return theme;
}
