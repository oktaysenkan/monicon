import path from "path";
import slugify from "slugify";

import type { Icon } from "../../index";
import { MoniconPlugin, MoniconPluginFile } from "../types";

slugify.extend({ ":": "/" });

export type SvgPluginOptions = void | {
  outputPath?: ((icon: Icon) => string | undefined) | string;
  fileName?: ((icon: Icon) => string | undefined) | string;
};

/**
 * Get the file name for the icon
 * @param icon - The icon to get the file name for
 * @param options - The options for the plugin
 * @returns The file name for the icon
 */
const getFileName = (icon: Icon, options: SvgPluginOptions) => {
  const defaultFileName = slugify(icon.name, { lower: true, remove: /:/g });

  return typeof options?.fileName === "function"
    ? (options.fileName(icon) ?? defaultFileName)
    : (options?.fileName ?? defaultFileName);
};

/**
 * Get the output path for the icon
 * @param icon - The icon to get the output path for
 * @param options - The options for the plugin
 * @returns The output path for the icon
 */
const getOutputPath = (icon: Icon, options: SvgPluginOptions) => {
  const defaultOutputPath = "src/components/icons";

  if (!options?.outputPath) {
    return defaultOutputPath;
  }

  return typeof options.outputPath === "function"
    ? (options.outputPath(icon) ?? defaultOutputPath)
    : (options.outputPath ?? defaultOutputPath);
};

/**
 * Generate icon files
 * @param icons - The icons to generate
 * @param outputPath - The path to output the icons to
 */
const generateIconFiles = (icons: Icon[], options: SvgPluginOptions) => {
  return icons.map((icon) => {
    const fileName = getFileName(icon, options);

    const outputPath = getOutputPath(icon, options);
    const filePath = path.join(outputPath, `${fileName}.svg`);

    const file: MoniconPluginFile = {
      path: path.resolve(filePath),
      content: icon.svg,
    };

    return file;
  });
};

/**
 * SVG plugin to generate icon files
 * @param options - The options for the plugin
 */
export const svg: MoniconPlugin<SvgPluginOptions> = (options) => (payload) => {
  return {
    name: "monicon-svg-plugin",
    onStart: () => generateIconFiles(payload.icons, options),
    onUpdate: () => generateIconFiles(payload.icons, options),
  };
};
