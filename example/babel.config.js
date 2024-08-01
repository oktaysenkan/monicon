const path = require('path');
const pak = require('../package.json');

module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.tsx', '.ts', '.js', '.json'],
          alias: {
            // For development, we want to alias the library to the source
            [pak.name]: path.join(__dirname, '..', pak.source),
          },
        },
      ],
      [
        path.join(__dirname, '..', 'dist', 'babel'),
        {
          icons: [
            'mdi:home',
            'mdi:account-circle',
            'mdi:account',
            'mdi:account-group',
            'mdi:ab-testing',
            'mdi:abacus',
            'mdi:abjad-arabic',
            'mdi:abjad-hebrew',
            'mdi:abugida-devanagari',
            'mdi:abugida-thai',
            'mdi:access-point',
            'mdi:access-point-check',
            'mdi:access-point-minus',
            'mdi:access-point-network',
            'feather:activity',
          ],
        },
      ],
    ],
  };
};
