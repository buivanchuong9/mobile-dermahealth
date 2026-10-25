/**
 * Bundles the app with Metro for each platform and checks, through the
 * sourcemap, that platform-specific files are picked (or not) as expected.
 * Add a row to `expectations` when a new `.ios.*` / `.android.*` file is added.
 */
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'build');

const expectations = {
  ios: {
    included: ['Button.feedback.ts'],
    excluded: ['Button.feedback.android.ts'],
  },
  android: {
    included: ['Button.feedback.android.ts'],
    excluded: ['Button.feedback.ts'],
  },
};

fs.mkdirSync(outDir, { recursive: true });
let failed = false;

for (const [platform, rule] of Object.entries(expectations)) {
  const bundle = path.join(outDir, `resolution.${platform}.jsbundle`);
  const map = `${bundle}.map`;
  execFileSync(
    'npx',
    [
      'react-native', 'bundle',
      '--platform', platform,
      '--dev', 'false',
      '--entry-file', 'index.js',
      '--bundle-output', bundle,
      '--sourcemap-output', map,
    ],
    { cwd: root, stdio: 'ignore' },
  );
  const sourceMap = JSON.parse(fs.readFileSync(map, 'utf8'));
  // Metro emits an indexed source map: one section per module.
  const sources = sourceMap.sections.flatMap(section =>
    section.map.sources.map(source => path.basename(source)),
  );
  for (const file of rule.included) {
    const ok = sources.includes(file);
    failed ||= !ok;
    console.log(`${ok ? 'PASS' : 'FAIL'} ${platform}: bundle includes ${file}`);
  }
  for (const file of rule.excluded) {
    const ok = !sources.includes(file);
    failed ||= !ok;
    console.log(`${ok ? 'PASS' : 'FAIL'} ${platform}: bundle excludes ${file}`);
  }
}

process.exit(failed ? 1 : 0);
