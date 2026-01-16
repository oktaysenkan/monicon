import path from "path";
import slugify from "slugify";
import type { Icon } from "../../types";
import {
  MoniconPlugin,
  MoniconPluginFile,
  MoniconPluginInstance,
} from "../types";

slugify.extend({ ":": "/" });

export type GenericPluginOptions =
  | (Partial<MoniconPluginInstance> & {
      outputPath?: ((icon: Icon) => string | undefined) | string;
      fileName?: ((icon: Icon) => string | undefined) | string;
      extension?: ((icon: Icon) => string | undefined) | string;
      content?: ((icon: Icon) => string) | string;
    })
  | void;

/**
 * Get the file name for the icon
 * @param icon - The icon to get the file name for
 * @param options - The options for the plugin
 * @returns The file name for the icon
 */
const getFileName = (icon: Icon, options: GenericPluginOptions) => {
  const defaultFileName = slugify(icon.name, { lower: true, remove: /:/g });

  const fileName =
    typeof options?.fileName === "function"
      ? (options.fileName(icon) ?? defaultFileName)
      : (options?.fileName ?? defaultFileName);

  const extension =
    typeof options?.extension === "function"
      ? (options.extension(icon) ?? "svg")
      : (options?.extension ?? "svg");

  return `${fileName}.${extension}`;
};

/**
 * Get the output path for the icon
 * @param icon - The icon to get the output path for
 * @param options - The options for the plugin
 * @returns The output path for the icon
 */
const getOutputPath = (icon: Icon, options: GenericPluginOptions) => {
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
const generateIconFiles = (icons: Icon[], options: GenericPluginOptions) => {
  const files: MoniconPluginFile[] = [];

  icons.forEach((icon) => {
    const fileName = getFileName(icon, options);

    if (!fileName) return;

    const outputPath = getOutputPath(icon, options);

    if (!outputPath) return;

    const content =
      typeof options?.content === "function"
        ? options?.content(icon)
        : options?.content;

    if (!content) {
      console.warn(
        `[Monicon] - No content found for icon "${icon.name}" in "${options?.name}" plugin`
      );
      return;
    }

    const filePath = path.join(outputPath, fileName);

    const file: MoniconPluginFile = {
      path: path.resolve(filePath),
      content: content,
    };

    files.push(file);
  });

  return files;
};

/**
 * SVG plugin to generate icon files
 * @param options - The options for the plugin
 */
export const generic: MoniconPlugin<GenericPluginOptions> =
  (options) => (payload) => {
    return {
      name: options?.name ?? "monicon-generic-plugin",
      generate() {
        return generateIconFiles(payload.icons, this);
      },
      ...options,
    };
  };
