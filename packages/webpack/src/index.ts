import { MoniconConfig, bootstrap } from "@monicon/core";
import { Compiler } from "webpack";

const pluginName = "webpack-monicon";

let iconsLoaded = false;

export class MoniconPlugin {
  name = pluginName;

  private config: MoniconConfig = {};

  constructor(config?: MoniconConfig) {
    this.config = config ?? {};
  }

  async apply(compiler: Compiler) {
    compiler.hooks.beforeCompile.tapAsync(
      this.name,
      async (params, callback) => {
        if (!iconsLoaded) {
          await bootstrap(this.config);
          iconsLoaded = true;
        }

        callback();
      }
    );
  }
}

export default MoniconPlugin;
