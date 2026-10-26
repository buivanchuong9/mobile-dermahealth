# Environment configuration

## Setup
```sh
cp .env.example .env     # first time only
pnpm env:check           # verifies .env matches the template
pnpm start --reset-cache # restart Metro after changing .env
```
`.env` is git-ignored; `.env.example` is the tracked template and the list of
variables the app may read. In CI, set the same `APP_*` variables in the
process environment (they take precedence over `.env`).

## Everything is public
Values are inlined into the JavaScript bundle at build time, so anyone with the
app can read them. **Never** put private keys, keystores, certificates,
service-account files or server secrets in `.env`. If an operation needs a
secret, move it to a trusted backend and call that backend instead.

## Variables
| Name | Required | Purpose |
|---|---|---|
| `APP_ENV` | yes | `development`, `staging` or `production` |
| `APP_LOG_LEVEL` | yes | minimum log level (`debug`, `info`, `warn`, `error`) |
| `APP_DEMO_ACCOUNT_EMAIL` / `APP_DEMO_ACCOUNT_PASSWORD` | no (both or neither) | public demo credentials of the **simulated** sign-in, also shown as a hint; rejected when `APP_ENV=production` |
| `APP_SIMULATION_LATENCY_MS` | no | delay of simulated sign-in and password reset (default 500) |
| `APP_ASSESSMENT_DURATION_MS` | no | duration of the simulated skin assessment (default 2400) |
| `APP_QUEUE_AUTO_STEP_MS` | no | interval of the queue auto-run simulation (default 4000) |

## How it works
1. `scripts/env/loadEnv.js` reads `.env.example` (allowed names, `APP_*` only)
   and `.env`; process variables win.
2. `scripts/env/inlineEnvPlugin.js` (a Babel plugin registered in
   `babel.config.js`) replaces `process.env.APP_NAME` with the value. Missing
   values become `undefined`. Other names, such as `NODE_ENV`, are untouched.
3. `metro.config.js` sets `cacheVersion` from the values, so changing `.env`
   never reuses stale cached transforms.
4. `src/app/configuration/` validates the values once at startup and exports the
   typed `appConfig`. A missing or invalid required value throws a
   `ConfigurationError` that lists every problem. Read configuration only from
   `appConfig`, only in `src/app`, and pass values into modules as parameters.

Adding a variable: add it to `.env.example`, to `RawAppEnv` and `appConfig.ts`
(`process.env.APP_X`), validate it in `loadAppConfig.ts`, then document it above.
`pnpm env:check` fails if the template and `appConfig.ts` drift apart.
