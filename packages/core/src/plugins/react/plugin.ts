import { pascalCase } from "change-case-all";
import { Eta } from "eta";
import { htmlToJsx } from "html-to-jsx-transform";
import path from "node:path";
import * as prettier from "prettier";
import slugify from "slugify";
import type { Icon } from "../../types";
import { parseIcon } from "../../utils/icon-processor";
import { MoniconPlugin, MoniconPluginFile } from "../types";
import templates from "./templates";

slugify.extend({ ":": "/" });

export type ReactPluginOptions = {
  outputPath?: ((icon: Icon) => string | undefined) | string;
  componentName?: (icon: Icon) => string | undefined;
  fileName?: (icon: Icon) => string | undefined;
  prefix?: ((icon: Icon) => string | undefined) | string;
  suffix?: ((icon: Icon) => string | undefined) | string;
  format?: "jsx" | "tsx";
} | void;

const getComponentName = (icon: Icon, options: ReactPluginOptions) => {
  const parsedIcon = parseIcon(icon.name);
  const componentName = pascalCase(parsedIcon.name);

  const prefix =
    typeof options?.prefix === "function"
      ? options.prefix(icon)
      : (options?.prefix ?? "");

  const suffix =
    typeof options?.suffix === "function"
      ? options.suffix(icon)
      : (options?.suffix ?? "");

  return `${prefix}${componentName}${suffix}`;
};

const getFileName = (icon: Icon, options: ReactPluginOptions) => {
  const defaultFileName = slugify(icon.name, { lower: true, remove: /:/g });

  return typeof options?.fileName === "function"
    ? (options.fileName(icon) ?? defaultFileName)
    : (options?.fileName ?? defaultFileName);
};

const getOutputPath = (icon: Icon, options: ReactPluginOptions) => {
  const defaultOutputPath = "src/components/icons";

  if (!options?.outputPath) {
    return defaultOutputPath;
  }

  return typeof options.outputPath === "function"
    ? (options.outputPath(icon) ?? defaultOutputPath)
    : (options.outputPath ?? defaultOutputPath);
};

/**
 * Generate React icon files
 * @param icons - The icons to generate
 * @param outputPath - The path to output the icons to
 */
const generateIconFiles = (
  options: ReactPluginOptions,
  icons: Icon[]
): Promise<MoniconPluginFile[]> => {
  const eta = new Eta({ autoEscape: false });

  return Promise.all(
    icons.map(async (icon) => {
      const fileName = getFileName(icon, options);
      const componentName = getComponentName(icon, options);
      const fileFormat = options?.format ?? "tsx";

      const reactCode = htmlToJsx(icon.svg);

      const templateContent = templates[fileFormat];

      const fileContent = eta.renderString(templateContent, {
        name: componentName,
        code: reactCode,
        format: fileFormat,
        height: icon.height,
        width: icon.width,
      });

      const fileContentWithProps = fileContent.replace(
        /(<svg\b[^>]*)(?=>)/,
        "$1 {...props}"
      );

      const formattedCode = await prettier.format(fileContentWithProps, {
        parser: fileFormat === "tsx" ? "typescript" : "babel",
      });

      const outputPath = getOutputPath(icon, options);

      const filePath = path.join(outputPath, `${fileName}.${fileFormat}`);

      const file: MoniconPluginFile = {
        path: path.resolve(filePath),
        content: formattedCode,
      };

      return file;
    })
  );
};

/**
 * React plugin to generate icon files
 * @param options - The options for the plugin
 */
export const react: MoniconPlugin<ReactPluginOptions> =
  (options) => (payload) => {
    const defaultOptions: ReactPluginOptions = {
      suffix: "Icon",
      ...options,
    };

    return {
      name: "monicon-react-plugin",
      generate: () => generateIconFiles(defaultOptions, payload.icons),
    };
  };
