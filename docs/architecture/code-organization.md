# Code organization and naming convention

This document is the contract for where code lives. It applies to every layer;
exceptions are listed in `architecture-map.md`.

## Layers and ownership
| Layer | Owns | Must not |
|---|---|---|
| `design-system` | tokens, themes, typography, foundational primitives and the business-agnostic building blocks built from them (inputs, surfaces, feedback, data display, overlays) | import feature code or mock data; contain business rules |
| `shared` | localization, cross-feature hooks and utilities (`shared/hooks`, `shared/utilities`) | import UI or feature code |
| `core` | framework-independent contracts, errors, logging, clock, fictional demo cast | import React, React Native or UI |
| `platform` | adapters for native capabilities (storage, alerts) | be imported by modules directly |
| `modules/<feature>` | screens, components, hooks, state and rules of one feature | import another module's private files (use `@modules/<name>`) |
| `app` | composition, providers, navigation | contain feature logic |

`shared/components` is intentionally not created: every business-agnostic UI
building block already lives in `design-system`. A feature component is only
moved to a shared layer when a second feature actually needs it.

## A component gets its own folder
```text
ComponentName/
├── ComponentName.tsx            the one primary component (composition)
├── ComponentName.types.ts       props and other public types
├── ComponentName.styles.ts      StyleSheet / style factories (3+ entries or dynamic)
├── ComponentName.constants.ts   lookup tables and lists (not data, not mock data)
├── ComponentName.animations.ts  animation hooks and definitions
├── components/<Child>/          children with an independent responsibility
├── hooks/useX.ts                logic that only this component uses
└── index.ts                     public API (explicit exports only)
```
Create a file only when it has a real responsibility. Do not split trivial JSX,
a one-line constant, or two style entries into files.

## Feature module layout
```text
modules/<feature>/
├── index.ts                     public API
├── domain/{entities,rules,repositories|services}/
├── data/{mock,repositories}/    mock datasets and repository implementations
├── presentation/{screens,components,hooks}/
└── docs/
```
Mock datasets live in `data/mock/*.mock.ts`, never in screens or components.
Repository interfaces live in `domain/`; implementations in `data/`.
Hooks used by several components of a module live in `presentation/hooks/`;
a hook used by one component lives in that component's `hooks/` folder.

## Naming
- Components, types, interfaces, enums-as-unions: `PascalCase` nouns
  (`AppointmentCard`, `QueueSnapshot`). No `Helper`, `Manager`, `Common`,
  `Utils`, `Misc` or numbered names.
- Actions and functions: verbs in `camelCase` (`loadAppointments`,
  `validateBookingSelection`, `handleBooking`). Hooks: `useNoun`.
- Constants: `UPPER_SNAKE_CASE`. Files that export one thing are named after it.
- Platform variants: `Name.ios.tsx` / `Name.android.tsx`, same props contract.
- Documentation files: `kebab-case.md`. Code identifiers and docs are English;
  user-facing strings are Vietnamese and live in `shared/localization`.

## Dependencies
- Import another component only through its `index.ts`; never reach into its
  `components/` or `hooks/`.
- No circular dependencies. `domain` never imports React, React Native,
  storage, or UI.
- UI components never perform network or storage access and never import
  feature mock data.
