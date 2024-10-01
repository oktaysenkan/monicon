import {
  loadIcons,
  getIconsFilePath,
  IconifyOptions,
  getResolveAlias,
} from "@oktaytest/core";
import { Compiler } from "webpack";
import { assign } from "radash";

export class IconifyPlugin {
  private options!: IconifyOptions;

  constructor(options: IconifyOptions) {
    this.options = options;
  }

  async apply(compiler: Compiler) {
    const alias = getResolveAlias();

    await loadIcons(this.options);

    compiler.options.resolve = assign(compiler.options.resolve, {
      alias: {
        [alias]: getIconsFilePath(this.options),
      },
    });
  }
}

export default IconifyPlugin;
