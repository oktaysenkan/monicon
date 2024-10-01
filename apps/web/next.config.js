const { IconifyPlugin } = require("@oktaytest/webpack");

module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Transform all direct `react-native` imports to `react-native-web`
      "react-native$": "react-native-web",
    };

    config.resolve.extensions = [
      ".web.js",
      ".web.jsx",
      ".web.ts",
      ".web.tsx",
      ...config.resolve.extensions,
    ];

    config.plugins.push(
      new IconifyPlugin({
        icons: [
          "mdi:home",
          "mdi:account",
          "mdi:account-badge-outline",
          "feather:activity",
          "feather:alert-circle",
          "logos:active-campaign",
          "logos:apache-superset-icon",
        ],
        outputFileName: "next",
      })
    );

    return config;
  },
};
