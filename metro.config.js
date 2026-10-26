const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { loadEnv } = require('./scripts/env/loadEnv');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * `cacheVersion` changes with the .env values so cached transforms that
 * inlined old configuration are never reused.
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  cacheVersion: `env-${loadEnv(__dirname).hash}`,
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
