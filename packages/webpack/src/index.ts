import {
  loadIcons,
  getIconsFilePath,
  MoniconOptions,
  getResolveAlias,
} from "@monicon/core";
import { Compiler } from "webpack";

const pluginName = "webpack-monicon";

let iconsLoaded = false;

export class MoniconPlugin {
  name = pluginName;

  private options!: MoniconOptions;

  constructor(options: MoniconOptions) {
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

export default MoniconPlugin;
