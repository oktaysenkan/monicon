import { MoniconOptions } from "@monicon/core";
import { MoniconPlugin as MoniconWebpackPlugin } from "@monicon/webpack";

const pluginName = "rspack-monicon";

export class MoniconPlugin extends MoniconWebpackPlugin {
  name = pluginName;

  constructor(options: MoniconOptions) {
    const opts: MoniconOptions = {
      type: "esm",
      ...options,
    };

    super(opts);
  }
}

export default MoniconPlugin;
