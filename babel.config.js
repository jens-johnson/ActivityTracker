module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',
      '@babel/preset-react'
    ],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          "moduleName": "@env",
          "path": ".env",
          "blacklist": null,
          "whitelist": null,
          "safe": false,
          "allowUndefined": false
        }
      ],
      [
        'module-resolver',
        {
          alias: {
            ui: './src/ui',
            common: './src/common',
            client: './src/client',
            service: './src/service',
            assets: './src/assets',
            config: './src/config',
            utils: './src/utils'
          },
        },
      ]
    ]
  };
};
