module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          path: process.env.ENVFILE,
          moduleName: '@env',
          safe: false,
          allowUndefined: true,
          blocklist: [
            'STORE_FILE',
            'STORE_PASSWORD',
            'KEY_ALIAS',
            'KEY_PASSWORD',
          ],
        },
      ],
    ],
  };
};
