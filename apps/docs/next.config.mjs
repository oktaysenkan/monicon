import nextra from "nextra";
import webpack from "webpack";

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
});

export default withNextra({
  webpack: (config) => {
    config.plugins = config.plugins || [];

    config.plugins.push(new webpack.ContextReplacementPlugin(/twoslash/));

    return config;
  },
});
