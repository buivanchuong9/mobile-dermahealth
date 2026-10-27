# Code organization and naming convention

This is the contract for where code lives. It follows the layer-by-type layout
of the DermaHealth CRM (`crm/.claude/skills/crm-code-organization`), adapted to
React Native. One folder per kind of code; a feature is spread over those
folders under the same feature name.

## Layers
| Folder | Holds | Must not |
|---|---|---|
| `configs/` | `urls.ts` (**every backend endpoint**, URL prefix and permission code: `urlsApi`, `PERMISSIONS`) and `appConfig/` (validated `.env`) | contain logic beyond parsing/validation |
| `services/` | `services/<feature>/` data access and use cases (mock or real repositories, auth/assessment services), `services/api/` (HTTP client, token store), `services/storage/` and `services/alerts/` (native adapters) | import React, screens or components |
| `model/` | TypeScript types and interfaces: `model/<feature>/` (entities, repository and service interfaces, value objects) and `model/common/` (`Result`, `AppError`, `Logger`, `KeyValueStorage`) | contain UI or I/O |
| `pages/<Feature>/` | screens of one feature + `partials/` (its components) + `hooks/` | import another page's private files (use `@pages/<Feature>` index) |
| `components/` | business-agnostic UI: `primitives`, `inputs`, `surfaces`, `navigation`, `data-display`, `feedback`, `overlays`, `motion` | import pages, services or mock data |
| `styles/` | `tokens/` (colors, spacing, typography, motion...) and `theme/` | import components |
| `utils/` | pure helpers: `<feature>/` business rules, `logging/`, `clock/`, `accessibility/`, `localDateTime` | import React, React Native or UI |
| `hooks/` | hooks shared by several pages (`useAsyncQuery`) | import pages |
| `i18n/` | Vietnamese UI strings (`locales/vi/*`) and `translate` | |
| `mocks/` | `mocks/<feature>/*.mock.ts` datasets and `mocks/demo/` (fictional cast) | be imported by components |
| `contexts/` | app-wide React contexts (`AppServicesProvider`, `AppSessionProvider`) | |
| `app/` | `App/`, `composition/createAppServices.ts` (the only place that wires services), `navigation/` (navigators, route adapters) | contain feature logic |

Aliases (`tsconfig.json` + `babel.config.js`, keep in sync): `@app`,
`@components`, `@configs`, `@contexts`, `@hooks`, `@i18n`, `@mocks`, `@model`,
`@pages`, `@services`, `@styles`, `@utils`.

## One feature, one name, several folders
Feature `appointments`:
```text
configs/urls.ts                         urlsApi.appointments.*  (+ prefix, permission)
model/appointments/                     Appointment.ts, AppointmentRepository.ts
services/appointments/                  createMockAppointmentRepository.ts
utils/appointments/                     appointmentRules.ts (pure business rules)
mocks/appointments/                     appointments.mock.ts
pages/Appointments/                     index.ts (public API of the feature)
├── AppointmentListScreen/              a screen (own folder, .tsx/.types.ts/.styles.ts)
├── hooks/                              useAppointmentList.ts ...
└── partials/AppointmentCard/           components used by this page's screens
```
Folder names: `pages/` PascalCase; `model/`, `services/`, `utils/`, `mocks/`
camelCase (`skinAssessment`).

## A component gets its own folder
```text
ComponentName/
├── ComponentName.tsx            the one primary component
├── ComponentName.types.ts       props and other public types
├── ComponentName.styles.ts      StyleSheet / style factories (3+ entries or dynamic)
├── ComponentName.constants.ts   lookup tables and lists (not data, not mock data)
├── ComponentName.animations.ts  animation hooks and definitions
├── components/<Child>/          children with an independent responsibility
├── hooks/useX.ts                logic that only this component uses
└── index.ts                     public API (explicit exports only)
```
Create a file only when it has a real responsibility. Placement of a component:
used by one page -> that page's `partials/`; used by several pages and generic
-> `components/`; used by several pages and business-specific -> only then move
it to the owning page and expose it through that page's `index.ts`.

## Rules
- Mock datasets live in `mocks/<feature>/*.mock.ts`, never in screens or components.
- Interfaces live in `model/`; implementations (mock or real) in `services/`.
- Business rules are pure functions in `utils/<feature>/`.
- UI never calls the network or storage; screens receive services as props
  from `app/navigation/routes/*` (built in `createAppServices`).
- Every backend URL is written once, in `configs/urls.ts`; every `.env` value is
  read once, in `configs/appConfig`.
- Imports: absolute aliases across folders, relative only inside one component
  folder. Import another page only through `@pages/<Feature>` (its `index.ts`).
- No circular dependencies. `model` and `utils` never import React or React Native.

## Naming
- Components, types, interfaces: `PascalCase` nouns (`AppointmentCard`,
  `QueueSnapshot`). No `Helper`, `Manager`, `Common`, `Misc` or numbered names.
- Services and factories: `createMockXRepository`, `XService`; actions are
  verbs in `camelCase` (`loadAppointments`). Hooks: `useNoun`.
- Constants: `UPPER_SNAKE_CASE`. Files that export one thing are named after it.
- Platform variants: `Name.ios.tsx` / `Name.android.tsx`, same props contract.
- Documentation files: `kebab-case.md`. Code identifiers and docs are English;
  user-facing strings are Vietnamese and live in `i18n`.

## Adding a feature (checklist)
1. `configs/urls.ts`: endpoints (+ permission codes) the feature calls.
2. `model/<feature>/`: entities and the repository/service interface.
3. `services/<feature>/`: implementation; wire it in `app/composition/createAppServices.ts`.
4. `utils/<feature>/`: pure rules, if any. `mocks/<feature>/`: datasets while the backend is not ready.
5. `pages/<Feature>/`: screens, `partials/`, `hooks/`, `index.ts`.
6. `i18n/locales/vi/<feature>.ts`: strings.
7. `app/navigation/routes/<feature>/`: route adapters + `navigation.types.ts`.
8. `pnpm typecheck && pnpm lint && pnpm format:check`.
