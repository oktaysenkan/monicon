const PluginNotInstalledError = () =>
  new Error(
    `[React Native Iconify]

You need to install a Babel plugin before using this library. You can continue by adding the following to your babel.config.js'

Example:

module.exports = {
  presets: [
    ...
  ],
  plugins: [
    ...
    'react-native-iconify/plugin',
  ],
};`
  );

export default PluginNotInstalledError;
