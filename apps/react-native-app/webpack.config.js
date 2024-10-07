const createExpoWebpackConfigAsync = require("@expo/webpack-config");
const { MoniconPlugin } = require("@monicon/webpack");

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  config.plugins.push(
    new MoniconPlugin({
      icons: [
        "mdi:home",
        "mdi:account",
        "mdi:account-badge-outline",
        "feather:activity",
        "feather:alert-circle",
        "logos:active-campaign",
        "logos:apache-superset-icon",
        "icon-park-outline:arrow-circle-right",
      ],
      outputFileName: "react-native-app",
    })
  );

  return config;
};
