import { IconifyOptions } from "@oktaytest/core";
import { IconifyPlugin as IconifyWebpackPlugin } from "@oktaytest/webpack";

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
