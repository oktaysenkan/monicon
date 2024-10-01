import { loadIcons, getIconsFilePath } from "@oktaytest/core";
import { Compiler } from "webpack";
import { assign } from "radash";

export type IconifyOptions = {
  icons: string[];
};

export class IconifyPlugin {
  private options!: IconifyOptions;

  constructor(options: IconifyOptions) {
    this.options = options;
  }

  async apply(compiler: Compiler) {
    await loadIcons(this.options?.icons ?? []);

    compiler.options.resolve = assign(compiler.options.resolve, {
      alias: {
        oktay: getIconsFilePath("commonjs"),
      },
    });
  }
}

export default IconifyPlugin;
