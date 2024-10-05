// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const { withMonicon } = require("@monicon/metro");
const path = require("path");

// Find the workspace root, this can be replaced with `find-yarn-workspace-root`
const workspaceRoot = path.resolve(__dirname, "../..");
const projectRoot = __dirname;

const config = getDefaultConfig(projectRoot);

const configWithMonicon = withMonicon(config, {
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
});

// 1. Watch all files within the monorepo
configWithMonicon.watchFolders = [workspaceRoot];
// 2. Let Metro know where to resolve packages, and in what order
configWithMonicon.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];
// 3. Force Metro to resolve (sub)dependencies only from the `nodeModulesPaths`
configWithMonicon.resolver.disableHierarchicalLookup = true;

module.exports = configWithMonicon;
