module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "@monicon/babel-plugin",
        {
          icons: [
            "mdi:home",
            "mdi:account",
            "mdi:account-badge-outline",
            "feather:activity",
            "feather:alert-circle",
            "logos:active-campaign",
            "logos:apache-superset-icon",
          ],
          outputFileName: "react-native-app",
        },
      ],
    ],
  };
};
