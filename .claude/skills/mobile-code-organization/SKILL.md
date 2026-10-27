---
name: mobile-code-organization
description: Where code lives in the DermaHealth mobile app (React Native, layer-by-type like the CRM). Use BEFORE adding or moving any screen, component, service, model, endpoint, permission, mock, string or hook in this repo.
---

# Mobile code organization

Authoritative contract: `docs/architecture/code-organization.md` (read it for
details). Layout mirrors the CRM skill (`crm-code-organization`): one folder per
kind of code, a feature is the same name spread across those folders.

```text
configs/urls.ts   every backend endpoint, URL prefix, permission code (urlsApi, PERMISSIONS)
configs/appConfig validated .env (APP_*), read nowhere else
services/<feature>/  repositories/services (mock or real)      services/api  HTTP client
model/<feature>/     entities + repository/service interfaces model/common  Result, AppError, Logger
pages/<Feature>/     screens + partials/ (components) + hooks/ + index.ts (public API)
components/          generic UI: primitives, inputs, surfaces, feedback...
styles/ tokens,theme   utils/<feature> pure rules   i18n/ strings   mocks/<feature> datasets
contexts/ providers    hooks/ shared hooks            app/ App, composition, navigation
```
Aliases: `@app @components @configs @contexts @hooks @i18n @mocks @model @pages
@services @styles @utils`. Absolute across folders, relative only inside one
component folder; other pages only via `@pages/<Feature>`.

## Add a feature (in order)
1. `configs/urls.ts`: `urlsApi.<resource>.<action> = secured|open(METHOD, prefix, path, PERMISSIONS.X?)`.
2. `model/<feature>/`: types + interface. 3. `services/<feature>/`: implementation,
   wired ONLY in `app/composition/createAppServices.ts` (call the backend with
   `api.call(urlsApi…)`). 4. `utils/<feature>/` rules, `mocks/<feature>/` data.
5. `pages/<Feature>/`: `XScreen/` (+ `.types.ts`, `.styles.ts`), `partials/`, `hooks/`, `index.ts`.
6. `i18n/locales/vi/<feature>.ts`. 7. `app/navigation/routes/<feature>/` adapter + `navigation.types.ts`.
8. `pnpm typecheck && pnpm lint && pnpm format:check` (and `pnpm verify:platforms` if a `.ios/.android` file was added).

## Never
- Hard-code a URL, host or permission string outside `configs/urls.ts`; read `process.env` outside `configs/appConfig`.
- Put mock data in screens/components, or call network/storage from UI.
- Import React/React Native in `model/` or `utils/`; import another page's private files.
- Create new top-level folders in `src/`, `Helper/Manager/Common/Utils` names, or copy CRM code (only the organization is shared).
- User-facing strings are Vietnamese in `i18n`; code, identifiers and docs are English.
