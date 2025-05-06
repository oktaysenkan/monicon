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

  const plugins = await loadPlugins(config, icons);

  const pluginNames = plugins.map((plugin) => plugin.name);

  const files = await runPlugins(plugins, configModified, icons);

  await Promise.all(
    plugins.map(async (plugin) => plugin.beforeWriteFiles?.(files))
  );

  await writeFiles(files);

  await Promise.all(
    plugins.map(async (plugin) => plugin.afterWriteFiles?.(files))
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

  const loadedConfig = await loadConfigFile();

  const config = { ...defaultConfig, ...loadedConfig.config };

  await prepareIconFiles(config, false);

  if (config.watch) {
    await watchConfigFile({
      onUpdate: async (newConfig) => {
        await prepareIconFiles({ ...defaultConfig, ...newConfig }, true);
      },
    });
  }
};

export type { MoniconConfig };
