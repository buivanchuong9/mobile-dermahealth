# Design tokens and theme

Tokens live in `src/styles/tokens` (colors, typography, spacing, radius,
elevation, motion). Spacing is in multiples of 4. Components read tokens only
through `useTheme()`; they never import raw colors.

`ThemeProvider` defaults to `lightTheme`. To add a dark theme: add `'dark'` to
`ThemeName`, create `darkTheme.ts` with a `ThemeColors` palette, and add it to
the contrast pairs in `theme/contrastPairs.ts` (verify them for the new palette).

## Contrast
`theme/contrastPairs.ts` lists every foreground/background pair used by the UI
with its WCAG AA minimum. Check every pair for each theme when palettes change (`contrastRatio` in
`accessibility/contrast.ts`).
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

## Components (UI phase)
- Primitives: `Button` (primary/secondary/ghost/danger), `Typography`, `Icon`
  (Lucide, only icons listed in `iconMap.ts` are bundled).
- Inputs: `TextField` (label, error, password toggle), `SelectableCard`,
  `SwitchRow`.
- Surfaces: `Card`, `SectionCard`, `ScreenContainer`, `CollapsibleSection`.
- Navigation: `ScreenHeader`, `SegmentedTabs`.
- Data display: `StatusBadge`, `Avatar`, `ListItem`, `TimelineItem`, `Chip`.
- Feedback: `Banner`, `SimulationBanner`, `EmptyState`, `Skeleton`,
  `ProgressBar`, `SuccessMark`. Overlays: `ConfirmDialog`.

## Motion conventions
Animations use React Native `Animated`/`LayoutAnimation` (no extra library),
last 120-320 ms (`tokens/motion`), and are disabled or made static when
`useReducedMotion()` is true (`FadeInView`, `Skeleton`, `SuccessMark`,
`ProgressBar`, `CollapsibleSection`, stack transitions). Skeletons are for
content-shaped loading; spinners/progress bars are for real operations.
