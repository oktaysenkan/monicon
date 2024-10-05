import {
  loadIcons,
  getIconsFilePath,
  IconifyOptions,
  getResolveAlias,
} from "@oktaytest/core";
import { Compiler } from "webpack";

const pluginName = "webpack-iconify";

let iconsLoaded = false;

export class IconifyPlugin {
  name = pluginName;

  private options!: IconifyOptions;

  constructor(options: IconifyOptions) {
    this.options = options;
  }

  async apply(compiler: Compiler) {
    const alias = getResolveAlias();

    compiler.hooks.beforeCompile.tapAsync(
      this.name,
      async (params, callback) => {
        if (!iconsLoaded) {
          await loadIcons(this.options);
          iconsLoaded = true;
        }

        callback();
      }
    );

    compiler.options.resolve = {
      ...compiler.options.resolve,
      alias: {
        ...compiler.options.resolve.alias,
        [alias]: getIconsFilePath(this.options),
      },
    };
  }
}

export default IconifyPlugin;
