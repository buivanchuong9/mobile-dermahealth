const aliases = {
  '^@app/(.*)$': '<rootDir>/src/app/$1',
  '^@core/(.*)$': '<rootDir>/src/core/$1',
  '^@design-system/(.*)$': '<rootDir>/src/design-system/$1',
  '^@modules/(.*)$': '<rootDir>/src/modules/$1',
  '^@platform/(.*)$': '<rootDir>/src/platform/$1',
  '^@shared/(.*)$': '<rootDir>/src/shared/$1',
};

const base = {
  preset: '@react-native/jest-preset',
  setupFiles: ['<rootDir>/tests/jest.setup.js'],
  moduleNameMapper: aliases,
};

// The default platform decides which `.ios.*` / `.android.*` file Jest picks.
// Every test runs on iOS; `*.platform.test.*` files also run on Android.
module.exports = {
  projects: [
    {
      ...base,
      displayName: 'ios',
      haste: {
        defaultPlatform: 'ios',
        platforms: ['android', 'ios', 'native'],
      },
    },
    {
      ...base,
      displayName: 'android',
      testMatch: ['**/*.platform.test.{ts,tsx}'],
      haste: {
        defaultPlatform: 'android',
        platforms: ['android', 'ios', 'native'],
      },
    },
  ],
};
