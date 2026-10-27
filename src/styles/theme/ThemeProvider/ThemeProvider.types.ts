import type { ReactNode } from 'react';
import type { Theme } from '../Theme.types';

export type ThemeProviderProps = {
  readonly theme?: Theme;
  readonly children: ReactNode;
};
