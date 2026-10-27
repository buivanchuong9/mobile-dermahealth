# Motion and loading

Motion is built on React Native's own `Animated` API. No animation library was
added: Reanimated and worklets are not installed, and every effect here needs
only opacity, transform or a short color ease.

## Tokens

`src/styles/tokens/motion/motion.ts` holds every duration, easing,
spring, stagger and distance. Components read tokens; they do not hard-code
milliseconds.

| Token | Use |
| --- | --- |
| `duration.fast` 120 / `normal` 200 / `slow` 320 | state changes, entrances, progress |
| `easing.standard / enter / exit` | cubic-bezier via `getEasing` |
| `spring.press` | press feedback |
| `stagger.step` 50, `maxItems` 6 | list entrances (`staggerDelay(index)`) |
| `skeleton.pulseDuration`, `lowOpacity` | shared skeleton pulse |

## Primitives (`components/motion`, `primitives`)

- `FadeInView` / `useEntranceAnimation`: entrance (fade, rise, scale). Plays once
  per mount, so keep it mounted across refreshes.
- `staggerDelay(index)`: capped list delay (replaces ad-hoc `index * 60`).
- `usePressFeedback` / `PressableScale`: spring scale + opacity on the native
  thread. Every pressable surface uses it; `Button` keeps the Android ripple.
- `useSelectionProgress` / `SelectionFill`: eased background and border for
  selectable cards, chips, slots and tabs (JS driver, colors only).
- `useChangeFlash`: brief dip when a value changes after mount (queue status).
- `useLayoutTransition`: `LayoutAnimation` for expand/collapse.
- `useReducedMotion`: all of the above skip movement when the OS asks.

## Loading states

Each section is in exactly one state and never blocks the whole screen:

| State | Presentation |
| --- | --- |
| initial load / retry | content-shaped skeleton (`Skeleton`, `SkeletonRow`, `SkeletonGroup`, module skeletons) |
| background refresh | previous data stays; `useAsyncQuery().refreshing` is true |
| user action | the button's own spinner (`Button loading`) |
| empty | `EmptyState` |
| error | `EmptyState` with retry |
| complete | content fades in once |

`AsyncStateView` renders the loading / error / content triple for a query.
Skeletons share a single pulse (one timer for any number of placeholders) and
are static under reduced motion. A `SkeletonGroup` is announced once as
"loading"; its blocks are hidden from screen readers.

Animation completion is never used as a signal that work finished: data state
drives the UI, and no delay is added to simulated repositories.

## Rules

- Animate opacity and transform on the native driver; use the JS driver only
  for short color eases on user input.
- No continuous or decorative loops other than the skeleton pulse.
- Motion must not imply medical meaning (no animated "diagnosis" cues) or
  delivery that did not happen (chat shows no read/delivered animation).
- New lists use `staggerDelay`; new pressables use `PressableScale`.
