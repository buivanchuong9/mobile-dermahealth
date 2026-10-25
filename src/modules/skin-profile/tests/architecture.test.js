const fs = require('node:fs');
const path = require('node:path');

/**
 * Lightweight import-boundary check for the Skin Profile module and the layers
 * around it. A full dependency-cruiser setup arrives in Phase 3.4.
 */
const SRC = path.resolve(__dirname, '../../..');
const MODULE = path.join(SRC, 'modules/skin-profile');

/** @returns {string[]} */
function sourceFiles(directory) {
  if (!fs.existsSync(directory)) {
    return [];
  }
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      return entry.name === 'tests' ? [] : sourceFiles(full);
    }
    return /\.(ts|tsx)$/.test(entry.name) ? [full] : [];
  });
}

/** @returns {string[]} */
function importsOf(file) {
  const text = fs.readFileSync(file, 'utf8');
  const pattern = /(?:from|import)\s+['"]([^'"]+)['"]/g;
  return [...text.matchAll(pattern)].map(match => match[1]);
}

/**
 * @param {string} directory
 * @param {(specifier: string, file: string) => boolean} isForbidden
 * @returns {string[]}
 */
function violations(directory, isForbidden) {
  return sourceFiles(directory).flatMap(file =>
    importsOf(file)
      .filter(specifier => isForbidden(specifier, file))
      .map(specifier => `${path.relative(SRC, file)} -> ${specifier}`),
  );
}

const FRAMEWORK =
  /^(react|react-native|zustand|@react-native-async-storage\/.*|react-native-.*)$/;

const UI_AND_PLATFORM =
  /^(@design-system|@platform|@app)(\/|$)|\/presentation(\/|$)/;

describe('skin-profile layers', () => {
  test.each(['domain', 'application'])(
    '%s has no framework, UI, platform or data imports',
    layer => {
      const found = violations(
        path.join(MODULE, layer),
        spec =>
          FRAMEWORK.test(spec) ||
          UI_AND_PLATFORM.test(spec) ||
          /\/data(\/|$)/.test(spec) ||
          /^@modules\//.test(spec),
      );
      expect(found).toEqual([]);
    },
  );

  test('domain does not depend on application or data', () => {
    const found = violations(path.join(MODULE, 'domain'), spec =>
      /\/(application|data)(\/|$)/.test(spec),
    );
    expect(found).toEqual([]);
  });

  test('data has no framework, UI or platform imports', () => {
    const found = violations(
      path.join(MODULE, 'data'),
      spec => FRAMEWORK.test(spec) || UI_AND_PLATFORM.test(spec),
    );
    expect(found).toEqual([]);
  });

  test('the module never imports platform adapters (composition does)', () => {
    const found = violations(MODULE, spec => /^@platform(\/|$)/.test(spec));
    expect(found).toEqual([]);
  });
});

describe('layers around the module', () => {
  test.each(['core', 'design-system', 'shared', 'platform'])(
    '%s does not import modules or the app shell',
    layer => {
      const found = violations(path.join(SRC, layer), spec =>
        /^@(modules|app)(\/|$)/.test(spec),
      );
      expect(found).toEqual([]);
    },
  );

  test('core and shared do not import React Native or the design system', () => {
    for (const layer of ['core', 'shared']) {
      const found = violations(path.join(SRC, layer), spec =>
        /^(react|react-native|@design-system|@react-native-async-storage\/.*)(\/|$)/.test(
          spec,
        ),
      );
      expect(found).toEqual([]);
    }
  });

  test('only platform/ imports native storage libraries', () => {
    for (const layer of ['app', 'core', 'design-system', 'modules', 'shared']) {
      const found = violations(path.join(SRC, layer), spec =>
        /^@react-native-async-storage\//.test(spec),
      );
      expect(found).toEqual([]);
    }
  });

  test('nothing outside the module imports its private paths', () => {
    for (const layer of [
      'app',
      'core',
      'design-system',
      'platform',
      'shared',
    ]) {
      const found = violations(path.join(SRC, layer), spec =>
        /^@modules\/skin-profile\/.+/.test(spec),
      );
      expect(found).toEqual([]);
    }
  });
});

describe('home module', () => {
  const HOME = path.join(SRC, 'modules/home');

  test('uses other modules only through their public entry point', () => {
    const found = violations(
      HOME,
      spec => /^@modules\/(?!home)[^/]+\/.+/.test(spec) || /\.\.\/.*skin-profile/.test(spec),
    );
    expect(found).toEqual([]);
  });

  test('has no storage, platform or native library imports', () => {
    const found = violations(
      HOME,
      spec => /^@platform(\/|$)/.test(spec) || /^@react-native-async-storage\//.test(spec),
    );
    expect(found).toEqual([]);
  });
});
