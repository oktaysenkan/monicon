import { MoniconBundlerOptions } from "@monicon/core";
import { MoniconPlugin as MoniconWebpackPlugin } from "@monicon/webpack";

const pluginName = "rspack-monicon";

export class MoniconPlugin extends MoniconWebpackPlugin {
  name = pluginName;

  constructor(options?: MoniconBundlerOptions) {
    const opts: MoniconBundlerOptions = {
      type: "esm",
      ...options,
    };

    super(opts);
  }
}

export default MoniconPlugin;
