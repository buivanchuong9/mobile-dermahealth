module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@app': './src/app',
          '@components': './src/components',
          '@configs': './src/configs',
          '@contexts': './src/contexts',
          '@hooks': './src/hooks',
          '@i18n': './src/i18n',
          '@mocks': './src/mocks',
          '@model': './src/model',
          '@pages': './src/pages',
          '@services': './src/services',
          '@styles': './src/styles',
          '@utils': './src/utils',
        },
      },
    ],
    // Inlines process.env.APP_* from .env at bundle time (see scripts/env).
    require('./scripts/env/inlineEnvPlugin'),
  ],
};
