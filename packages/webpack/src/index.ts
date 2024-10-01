import {
  loadIcons,
  getIconsFilePath,
  IconifyOptions,
  getResolveAlias,
} from "@oktaytest/core";
import { Compiler } from "webpack";

const pluginName = "webpack-iconify";

export class IconifyPlugin {
  name = pluginName;

  private options!: IconifyOptions;

  constructor(options: IconifyOptions) {
    this.options = options;
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
