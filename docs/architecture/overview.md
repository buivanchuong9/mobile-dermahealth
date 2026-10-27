# Architecture overview (as implemented, UI phase)

Modular monolith. Folders are created only when they hold real code.

| Layer | Path | May import |
|---|---|---|
| App shell | `src/app`, `src/contexts` | everything |
| Pages (features) | `src/pages/<Feature>` (see `docs/architecture/modules.md`) | components, styles, hooks, i18n, model, services (types/props only), utils, configs; other pages only via their `index.ts` |
| Components | `src/components` | styles, hooks, i18n, model, utils |
| Services | `src/services` | model, utils, configs, mocks |
| Model | `src/model` | nothing (pure types) |
| Utils / hooks / i18n / styles / configs / mocks | `src/utils`, `src/hooks`, `src/i18n`, `src/styles`, `src/configs`, `src/mocks` | model, utils |

Aliases: `@app`, `@components`, `@configs`, `@contexts`, `@hooks`, `@i18n`,
`@mocks`, `@model`, `@pages`, `@services`, `@styles`, `@utils`
(configured in `tsconfig.json` and `babel.config.js`). The full contract is in
`docs/architecture/code-organization.md`.

> Boundaries are currently a convention verified by review; there is no
> automated import-boundary check in the repository since the test suite was
> removed (see `architecture-map.md`).

## Model and utils (`src/model/common`, `src/utils/logging`)
- `model/common`: `Result`, `AppError`, `Logger`/`LogSink`, `KeyValueStorage`.
  Pure TypeScript, no React Native or native imports.
- `utils/logging`: `createLogger` redacts message and context before they reach the
  sink. Redaction is a deny-list of personal/health/credential keys plus
  patterns for emails, phone numbers and bearer tokens. It is a safety net:
  never log health data on purpose.

## Localization (`src/i18n`)
Default locale is Vietnamese. UI strings go through `translate(key)`; keys are
type-checked against `locales/vi`. Code, identifiers and docs are English.

## Verification
- `pnpm typecheck`, `pnpm lint`, `pnpm format:check`, `pnpm bundle` (iOS and
  Android) and `pnpm verify:platforms` (Metro source maps show which
  platform-specific files each bundle contains).
- `pnpm env:check` validates the environment setup
  (`docs/development-guidelines/environment.md`).

## Platform storage (`src/services/storage`)
`createAsyncStorageKeyValueStorage(client)` adapts an AsyncStorage client to the
`KeyValueStorage` contract (`model/common`) (errors become `AppError('storage')`).
`createLocalKeyValueStorage()` binds it to the real library. Only `services/storage`
imports `@react-native-async-storage/async-storage`. Allowed data classes:
`docs/security/data-storage-policy.md`.

## Composition
`src/app/composition` is the only place that connects modules to platform
adapters (storage -> repository -> use cases -> screen).

## Skin Profile module
See `src/pages/SkinProfile/docs/README.md`.

## Navigation and composition (UI phase)
- Navigation uses React Navigation (native stack + bottom tabs). Pages are
  **navigation-agnostic**: screens take callbacks (`onOpenAppointment(id)`), and
  `src/app/navigation/routes/*` (one file per route) adapts them to routes and services.
- `src/app/composition/createAppServices.ts` builds every simulated repository,
  the demo clock and cross-module wiring (check-in creates a queue ticket,
  queue events create notifications and a vibration cue).
- Session state (`onboardingCompleted`, simulated user) is in memory only.

See `docs/architecture/simulation-and-integration.md` for how to replace a
simulated repository with a real API adapter.
