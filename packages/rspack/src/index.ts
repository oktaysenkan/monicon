import {
  loadIcons,
  getIconsFilePath,
  IconifyOptions,
  getResolveAlias,
  getResolveExtensions,
} from "@oktaytest/core";
import { Compiler, RspackPluginInstance } from "@rspack/core";

const pluginName = "rspack-iconify";

export class IconifyPlugin implements RspackPluginInstance {
  name = pluginName;
  private options!: IconifyOptions;

  constructor(options: IconifyOptions) {
    this.options = {
      type: "esm",
      ...options,
    };
  }

  async apply(compiler: Compiler) {
    const alias = getResolveAlias();

    compiler.options.resolve = {
      ...compiler.options.resolve,
      alias: {
        ...compiler.options.resolve.alias,
        [alias]: getIconsFilePath(this.options),
      },
    };

    await loadIcons(this.options);
  }
}

export default IconifyPlugin;
