import { MoniconPluginInstance } from "../plugins";
import { MoniconConfig } from "../types";

import { Icon } from "../types";

/**
 * Run the plugins
 * @param config - The config
 * @param icons - The icons to run the plugins on
 * @param configModified - Whether the config has been modified
 */
export const loadPlugins = async (
  config: Required<MoniconConfig>,
  icons: Icon[]
) => {
  const plugins = config.plugins.map((plugin) => plugin({ icons }));

  const pluginNames = plugins.map((plugin) => plugin.name);

  await Promise.all(
    plugins.map((plugin) => plugin.onPluginsLoad?.(pluginNames))
  );

  return plugins;
};

/**
 * Run the plugins
 * @param plugins - The plugins to run
 * @param configModified - Whether the config has been modified
 */
export const runPlugins = async (
  plugins: MoniconPluginInstance[],
  configModified: boolean,
  icons: Icon[]
) => {
  const files = await Promise.all(
    plugins.map(async (plugin) => {
      await plugin.beforeGenerate?.(icons);

      const files = await plugin.generate(configModified);

      await plugin.afterGenerate?.(icons);

      return files;
    })
  );

  return files.flat();
};
