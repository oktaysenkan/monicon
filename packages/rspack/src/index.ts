import { MoniconConfig } from "@monicon/core";
import { MoniconPlugin as MoniconWebpackPlugin } from "@monicon/webpack";

const pluginName = "rspack-monicon";

export class MoniconPlugin extends MoniconWebpackPlugin {
  name = pluginName;

  constructor(config?: MoniconConfig) {
    const opts: MoniconConfig = {
      ...config,
    };

    super(opts);
  }
}

export default MoniconPlugin;
