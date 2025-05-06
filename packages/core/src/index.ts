import type { Icon, MoniconConfig } from "./types";
import { loadConfigFile, watchConfigFile } from "./utils/config-loader";
import { writeFiles } from "./utils/file-system";
import { generateIcons } from "./utils/icon-processor";

/**
 * Run the plugins
 * @param config - The config
 * @param icons - The icons to run the plugins on
 * @param configModified - Whether the config has been modified
 */
const loadPlugins = async (
  config: Required<MoniconConfig>,
  icons: Icon[],
  configModified?: boolean
) => {
  const plugins = config.plugins;

  const files = await Promise.all(
    plugins.map(async (plugin) => {
      const pluginInstance = plugin({ icons });

      const loadedFiles = configModified
        ? await pluginInstance.onUpdate()
        : await pluginInstance.onStart();

      return loadedFiles;
    })
  );

  return files.flat();
};

const prepareIconFiles = async (
  config: Required<MoniconConfig>,
  configModified: boolean
) => {
  const icons = await generateIcons(config, configModified);
  const files = await loadPlugins(config, icons, configModified);
  return writeFiles(files.flat());
};

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
