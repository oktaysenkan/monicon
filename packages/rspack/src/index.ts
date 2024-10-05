import { IconifyOptions } from "@monicon/core";
import { IconifyPlugin as IconifyWebpackPlugin } from "@monicon/webpack";

const pluginName = "rspack-iconify";

export class IconifyPlugin extends IconifyWebpackPlugin {
  name = pluginName;

  constructor(options: IconifyOptions) {
    const opts: IconifyOptions = {
      type: "esm",
      ...options,
    };

    super(opts);
  }
}

export default IconifyPlugin;
