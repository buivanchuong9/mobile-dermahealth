module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@app': './src/app',
          '@core': './src/core',
          '@design-system': './src/design-system',
          '@modules': './src/modules',
          '@platform': './src/platform',
          '@shared': './src/shared',
        },
      },
    ],
  ],
};
