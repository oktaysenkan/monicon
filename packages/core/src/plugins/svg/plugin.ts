import { MoniconPlugin } from "../types";
import { generic, GenericPluginOptions } from "../generic";

type SvgPluginOptions = GenericPluginOptions;

/**
 * SVG plugin to generate icon files
 * @param options - The options for the plugin
 */
export const svg: MoniconPlugin<SvgPluginOptions> = (options) =>
  generic({
    name: "monicon-svg-plugin",
    content: (icon) => icon.svg,
    ...options,
  });
