import type {
  Elevation,
  Motion,
  Radius,
  Spacing,
  ThemeColors,
  Typography,
} from '../tokens';

/** Add `'dark'` here when a dark palette is introduced. */
export type ThemeName = 'light';

export type Theme = {
  readonly name: ThemeName;
  readonly colors: ThemeColors;
  readonly typography: Typography;
  readonly spacing: Spacing;
  readonly radius: Radius;
  readonly elevation: Elevation;
  readonly motion: Motion;
};
