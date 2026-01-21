import { MoniconConfig, bootstrap } from "@monicon/core";
import { Compiler } from "webpack";

const pluginName = "webpack-monicon";

export class MoniconPlugin {
  name = pluginName;

  private readonly config: MoniconConfig = {};
  private bootstrapPromise: Promise<void> | null = null;

  constructor(config?: MoniconConfig) {
    this.config = config ?? {};
  }

  async apply(compiler: Compiler) {
    const watch = compiler.options.watch === true;

    compiler.hooks.beforeCompile.tap("MoniconWebpackPlugin", async () => {
      if (!this.bootstrapPromise)
        this.bootstrapPromise = bootstrap({ watch, ...this.config });

      await this.bootstrapPromise;
    });
  }
}

export default MoniconPlugin;
