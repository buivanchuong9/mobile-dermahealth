# Architecture map

Companion to `code-organization.md` (the rules). This file shows what exists.

## Layers
```text
src/
├── app/         App/, composition/createAppServices.ts, navigation/ (navigators, tab bar, route adapters)
├── components/  business-agnostic UI (below)
├── configs/     urls.ts (backend endpoints + permission codes), appConfig/ (validated .env)
├── contexts/    AppServicesProvider/, AppSessionProvider/ (context + hooks/)
├── hooks/       useAsyncQuery
├── i18n/        translate, locales/vi/* (Vietnamese UI strings)
├── mocks/       <feature>/*.mock.ts datasets, demo/ (fictional cast)
├── model/       <feature>/ entities + repository/service interfaces, common/ (Result, AppError, Logger...)
├── pages/       12 features: screens, partials/, hooks/, index.ts
├── services/    <feature>/ implementations, api/ (HTTP client), storage/, alerts/
├── styles/      tokens/, theme/
└── utils/       <feature>/ pure rules, logging/, clock/, accessibility/, localDateTime
```

## components (31)
| Folder | Components |
|---|---|
| `primitives/` | `Button` (+ platform press feedback), `Typography`, `Icon` |
| `inputs/` | `TextField` (+ `PasswordVisibilityToggle`, `FieldMessage`), `SelectableCard` (+ `SelectionIndicator`), `SwitchRow` |
| `surfaces/` | `Card`, `SectionCard`, `ScreenContainer`, `CollapsibleSection` |
| `navigation/` | `ScreenHeader`, `SegmentedTabs` |
| `data-display/` | `StatusBadge`, `Avatar`, `Chip`, `ListItem`, `TimelineItem` (+ `TimelineRail`) |
| `feedback/` | `Banner`, `SimulationBanner`, `EmptyState`, `Skeleton`, `SkeletonCard`, `ProgressBar`, `SuccessMark` |
| `overlays/` | `ConfirmDialog` |
| `motion/` | `FadeInView`, `useReducedMotion` |

Animations live in `*.animations.ts` next to their component.

## Features
Each feature `<name>` appears in `pages/<Feature>`, `model/<name>`,
`services/<name>`, `utils/<name>` and `mocks/<name>` (only the folders it needs).
See `docs/architecture/modules.md` for responsibilities.

| Feature | Folder name in `pages/` |
|---|---|
| onboarding, authentication, home, appointments, queue, journey, chat, notifications, settings | `Onboarding`, `Authentication`, `Home`, `Appointments`, `Queue`, `Journey`, `Chat`, `Notifications`, `Settings` |
| skin-assessment, medical-records, skin-profile | `SkinAssessment`, `MedicalRecords`, `SkinProfile` (camelCase elsewhere: `skinAssessment`) |

## Known exceptions
1. `hooks/useAsyncQuery` imports React; `model` and `utils` never do.
2. `model/common` holds the tiny `Result`/`AppError` constructors next to their types.
3. Hooks used by one component are co-located in that component's `hooks/`.
4. Small style/constant sets stay inline (fewer than 3 style entries, one
   constant).
