import {
  loadIcons,
  getIconsFilePath,
  IconifyOptions,
  getResolveAlias,
  getResolveExtensions,
} from "@oktaytest/core";
import { Compiler, RspackPluginInstance } from "@rspack/core";
import { assign, merge } from "radash";

export class IconifyPlugin implements RspackPluginInstance {
  name = "rspack-iconify";
  private options!: IconifyOptions;

  constructor(options: IconifyOptions) {
    this.options = {
      type: "esm",
      ...options,
    };
  }

  async apply(compiler: Compiler) {
    const alias = getResolveAlias();

    await loadIcons(this.options);

    compiler.options.resolve = assign(compiler.options.resolve, {
      alias: {
        [alias]: getIconsFilePath(this.options),
      },
      extensions: merge(
        compiler.options.resolve.extensions ?? [],
        getResolveExtensions(),
        (item) => item
      ) as string[],
    });
  }
}

export default IconifyPlugin;
