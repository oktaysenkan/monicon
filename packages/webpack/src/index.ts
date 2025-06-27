import { MoniconConfig, bootstrap } from "@monicon/core";
import { Compiler } from "webpack";

const pluginName = "webpack-monicon";

let bootstraped = false;
export class MoniconPlugin {
  name = pluginName;

  private readonly config: MoniconConfig = {};

  constructor(config?: MoniconConfig) {
    this.config = config ?? {};
  }

  async apply(compiler: Compiler) {
    const watch = compiler.options.watch === true;

    compiler.hooks.beforeCompile.tapPromise(
      "MoniconWebpackPlugin",
      async () => {
        if (bootstraped) return;

        await bootstrap({ watch, ...this.config });
        bootstraped = true;
      }
    );
  }
}

export default MoniconPlugin;
