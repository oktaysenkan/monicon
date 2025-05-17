import type { MoniconConfig } from "./types";
import { loadConfigFile, watchConfigFile } from "./utils/config-loader";
import { writeFiles } from "./utils/file-system";
import { generateIcons } from "./utils/icon-processor";
import { runPlugins } from "./utils/plugin-loader";
import { loadPlugins } from "./utils/plugin-loader";

/**
 * Prepare the icon files
 * @param config - The config
 * @param configModified - Whether the config has been modified
 */
const prepareIconFiles = async (
  config: Required<MoniconConfig>,
  configModified: boolean
) => {
  const icons = await generateIcons(config);

  const plugins = await loadPlugins(config, configModified, icons);

  const files = await runPlugins(plugins, configModified, icons);

  await Promise.all(
    plugins.map(async (plugin) =>
      plugin.beforeWriteFiles?.({
        configUpdated: configModified,
        files,
      })
    )
  );

  await writeFiles(files);

  await Promise.all(
    plugins.map(async (plugin) =>
      plugin.afterWriteFiles?.({
        configUpdated: configModified,
        files,
      })
    )
  );
};

/**
 * Bootstrap the icon generator
 * @param options - The options
 */
export const bootstrap = async (options?: MoniconConfig) => {
  const defaultConfig: Required<MoniconConfig> = {
    icons: [],
    watch: true,
    plugins: [],
    loaders: {},
    collections: [],
    ...options,
  };

  const loadedConfig = loadConfigFile();

  console.log({ loadedConfig });

  const config = { ...defaultConfig, ...loadedConfig.config };

  console.log("[Monicon] Starting icon generation...");

  if (config.watch) console.log("[Monicon] Watching for config changes...");

  prepareIconFiles(config, false);

  if (config.watch) {
    watchConfigFile({
      onUpdate: async (newConfig) => {
        console.log("[Monicon] Config updated, re-generating icons...");
        console.log({ newConfig });

        await prepareIconFiles({ ...defaultConfig, ...newConfig }, true);
      },
    });
  }
};

export type { MoniconConfig };
