import {
  getIconsFilePath,
  getResolveAlias,
  watchConfig,
  MoniconBundlerOptions,
} from "@monicon/core";
import { Compiler } from "webpack";

const pluginName = "webpack-monicon";

let watchStarted = false;

export class MoniconPlugin {
  name = pluginName;

  options: MoniconBundlerOptions | undefined;

  constructor(options?: MoniconBundlerOptions) {
    this.options = { type: "cjs", ...options };
  }

  async apply(compiler: Compiler) {
    const alias = getResolveAlias();

    compiler.hooks.beforeCompile.tapAsync(this.name, async (_, callback) => {
      if (!watchStarted) {
        await watchConfig(this.options);
        watchStarted = true;
      }

      callback();
    });

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
