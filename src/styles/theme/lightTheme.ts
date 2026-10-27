import {
  elevation,
  lightColors,
  motion,
  radius,
  spacing,
  typography,
} from '../tokens';
import type { Theme } from './Theme.types';

export const lightTheme: Theme = {
  name: 'light',
  colors: lightColors,
  typography,
  spacing,
  radius,
  elevation,
  motion,
};
