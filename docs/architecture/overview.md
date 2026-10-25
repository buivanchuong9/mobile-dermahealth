# Architecture overview (as implemented in Phase 3.3)

Modular monolith. Folders are created only when they hold real code.

| Layer | Path | May import |
|---|---|---|
| App shell | `src/app` | everything |
| Modules | `src/modules/*` (`skin-profile` exists) | core, design-system, platform, shared; other modules only via their `index.ts` |
| Design system | `src/design-system` | shared |
| Core | `src/core` | shared |
| Platform adapters | `src/platform` (`storage`) | `core/contracts`, shared |
| Shared | `src/shared` | nothing |

Aliases: `@app`, `@core`, `@design-system`, `@modules`, `@platform`, `@shared`
(configured in `tsconfig.json`, `babel.config.js`, `jest.config.js`).
Inside a layer, use relative imports and each folder's `index.ts` as its public API.

> Boundaries are enforced for now by `modules/skin-profile/tests/architecture.test.js`
> (import scan). A full `pnpm arch:check` with dependency-cruiser arrives in Phase 3.4.

## Core (`src/core`)
- `contracts`: `Result`, `AppError`, `Logger`/`LogSink`, `KeyValueStorage`.
  Pure TypeScript, no React Native or native imports.
- `logging`: `createLogger` redacts message and context before they reach the
  sink. Redaction is a deny-list of personal/health/credential keys plus
  patterns for emails, phone numbers and bearer tokens. It is a safety net:
  never log health data on purpose.

## Localization (`src/shared/localization`)
Default locale is Vietnamese. UI strings go through `translate(key)`; keys are
type-checked against `locales/vi.ts`. Code, identifiers and docs are English.

## Testing
- Jest has two projects: `ios` runs every test; `android` runs only
  `*.platform.test.*` files with `haste.defaultPlatform = android`.
- `pnpm verify:platforms` bundles with Metro per platform and checks via source
  maps which platform-specific files were included.

## Platform storage (`src/platform/storage`)
`createAsyncStorageKeyValueStorage(client)` adapts an AsyncStorage client to the
core `KeyValueStorage` contract (errors become `AppError('storage')`).
`createLocalKeyValueStorage()` binds it to the real library. Only `platform/`
imports `@react-native-async-storage/async-storage`. Allowed data classes:
`docs/security/data-storage-policy.md`.

## Composition
`src/app/composition` is the only place that connects modules to platform
adapters (storage -> repository -> use cases -> screen).

## Skin Profile module
See `src/modules/skin-profile/docs/README.md`.
