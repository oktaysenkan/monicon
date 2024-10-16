const createExpoWebpackConfigAsync = require("@expo/webpack-config");
const { MoniconPlugin } = require("@monicon/webpack");

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  config.plugins.push(
    new MoniconPlugin({ outputFileName: "react-native-app" })
  );

  return config;
};
