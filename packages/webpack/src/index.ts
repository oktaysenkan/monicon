import { MoniconConfig, bootstrap } from "@monicon/core";
import type { Compiler } from "webpack";

const pluginName = "MoniconWebpackPlugin";

export class MoniconPlugin {
  name = pluginName;

  private readonly config: MoniconConfig;
  private bootstrapPromise: Promise<void> | null = null;

  constructor(config?: MoniconConfig) {
    this.config = config ?? {};
  }

  apply(compiler: Compiler) {
    const runBootstrap = async () => {
      if (!this.bootstrapPromise) {
        const watch =
          compiler.options.watch === true ||
          compiler.watchMode === true;

        this.bootstrapPromise = bootstrap({
          watch,
          ...this.config,
        })

        return this.bootstrapPromise;
      };

      compiler.hooks.beforeRun.tapPromise(pluginName, runBootstrap);
      compiler.hooks.watchRun.tapPromise(pluginName, runBootstrap);
    }
  }
}

export default MoniconPlugin;
