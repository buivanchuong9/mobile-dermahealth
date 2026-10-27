/**
 * `pnpm env:check`: verifies the local environment setup.
 *  1. `.env` (or the process environment) defines every variable in `.env.example`.
 *  2. `src/configs/appConfig/appConfig.ts` reads every declared variable, so the
 *     template and the typed configuration cannot drift apart.
 */
const fs = require('node:fs');
const path = require('node:path');
const { loadEnv } = require('./loadEnv');

const root = path.resolve(__dirname, '../..');
const { declared, values } = loadEnv(root);
const problems = [];

if (!fs.existsSync(path.join(root, '.env')) && Object.keys(values).length === 0) {
  problems.push('No .env file found. Run: cp .env.example .env');
}
for (const name of declared) {
  if (!(name in values)) {
    problems.push(`${name} is declared in .env.example but not set.`);
  }
}
const configSource = fs.readFileSync(
  path.join(root, 'src/configs/appConfig/appConfig.ts'),
  'utf8',
);
for (const name of declared) {
  if (!configSource.includes(`process.env.${name}`)) {
    problems.push(`${name} is declared in .env.example but never read by appConfig.ts.`);
  }
}

if (problems.length > 0) {
  console.error('Environment check failed:\n- ' + problems.join('\n- '));
  process.exit(1);
}
console.log(`Environment check passed (${declared.length} variables).`);
