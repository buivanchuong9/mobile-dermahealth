/**
 * Reads the public build-time configuration.
 *
 * - The allowed variable names are the keys declared in `.env.example`.
 * - Values come from `.env`; variables already set in the process environment
 *   (for example in CI) take precedence.
 * - Nothing outside the declared APP_* names is ever exposed to the app.
 */
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { parseEnv } = require('node:util');

const NAME_PATTERN = /^APP_[A-Z0-9_]+$/;

function readFile(file) {
  return fs.existsSync(file) ? parseEnv(fs.readFileSync(file, 'utf8')) : {};
}

function loadEnv(projectRoot) {
  const examplePath = path.join(projectRoot, '.env.example');
  if (!fs.existsSync(examplePath)) {
    throw new Error('.env.example is missing: it declares the allowed variables.');
  }
  const declared = Object.keys(readFile(examplePath));
  const invalid = declared.filter(name => !NAME_PATTERN.test(name));
  if (invalid.length > 0) {
    throw new Error(
      `.env.example may only declare APP_* variables, found: ${invalid.join(', ')}`,
    );
  }

  const fromFile = readFile(path.join(projectRoot, '.env'));
  const values = {};
  for (const name of declared) {
    const value = process.env[name] ?? fromFile[name];
    if (value !== undefined) {
      values[name] = value;
    }
  }
  const hash = crypto
    .createHash('sha1')
    .update(JSON.stringify(values))
    .digest('hex')
    .slice(0, 12);
  return { declared, values, hash };
}

module.exports = { loadEnv };
