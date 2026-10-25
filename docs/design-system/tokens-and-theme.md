# Design tokens and theme

Tokens live in `src/design-system/tokens` (colors, typography, spacing, radius,
elevation, motion). Spacing is in multiples of 4. Components read tokens only
through `useTheme()`; they never import raw colors.

`ThemeProvider` defaults to `lightTheme`. To add a dark theme: add `'dark'` to
`ThemeName`, create `darkTheme.ts` with a `ThemeColors` palette, and add it to
the `themes` list in `theme/tests/theme.test.tsx`.

## Contrast
`theme/contrastPairs.ts` lists every foreground/background pair used by the UI
with its WCAG AA minimum. The test suite checks all pairs for every theme.
Disabled labels are intentionally excluded (WCAG exempts inactive controls).
When a component introduces a new color pair, add it to that list.

## Accessibility defaults
- `MIN_TOUCH_TARGET = 44`; small controls add `hitSlop` to reach it.
- Buttons expose `accessibilityRole="button"`, `disabled` and `busy` state.
- No continuous animation exists yet; motion tokens are durations only.
  Reduced-motion handling must be added together with the first animation.

## Button
`primitives/Button`: variants `primary | secondary | ghost`, sizes
`sm | md | lg`, `disabled`, `loading`, `fullWidth`.
