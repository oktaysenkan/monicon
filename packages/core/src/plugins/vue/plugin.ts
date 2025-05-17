import { pascalCase } from "change-case-all";
import { Eta } from "eta";
import path from "node:path";
import * as prettier from "prettier";
import slugify from "slugify";
import type { Icon } from "../../types";
import { parseIcon } from "../../utils/icon-processor";
import { MoniconPlugin, MoniconPluginFile } from "../types";
import templates from "./templates";

slugify.extend({ ":": "/" });

export type VuePluginOptions = {
  outputPath?: ((icon: Icon) => string | undefined) | string;
  componentName?: (icon: Icon) => string | undefined;
  fileName?: (icon: Icon) => string | undefined;
  prefix?: ((icon: Icon) => string | undefined) | string;
  suffix?: ((icon: Icon) => string | undefined) | string;
  template?: "js" | "ts";
} | void;

const getComponentName = (icon: Icon, options: VuePluginOptions) => {
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

const getFileName = (icon: Icon, options: VuePluginOptions) => {
  const defaultFileName = slugify(icon.name, { lower: true, remove: /:/g });

  return typeof options?.fileName === "function"
    ? (options.fileName(icon) ?? defaultFileName)
    : (options?.fileName ?? defaultFileName);
};

const getOutputPath = (icon: Icon, options: VuePluginOptions) => {
  const defaultOutputPath = "src/components/icons";

  if (!options?.outputPath) {
    return defaultOutputPath;
  }

  return typeof options.outputPath === "function"
    ? (options.outputPath(icon) ?? defaultOutputPath)
    : (options.outputPath ?? defaultOutputPath);
};

const generateIconFiles = (
  options: VuePluginOptions,
  icons: Icon[]
): Promise<MoniconPluginFile[]> => {
  const eta = new Eta({ autoEscape: false });

  return Promise.all(
    icons.map(async (icon) => {
      const fileName = getFileName(icon, options);
      const componentName = getComponentName(icon, options);
      const fileFormat = options?.template ?? "ts";

      const template = templates[fileFormat];

      const fileContent = eta.renderString(template, {
        name: componentName,
        code: icon.svg,
        height: icon.height,
        width: icon.width,
      });

      const fileContentWithProps = fileContent.replace(
        /(<svg\b[^>]*)(?=>)/,
        '$1 v-bind="props"'
      );

      const formattedCode = await prettier.format(fileContentWithProps, {
        parser: "vue",
      });

      const outputPath = getOutputPath(icon, options);

      const filePath = path.join(outputPath, `${fileName}.vue`);

      const file: MoniconPluginFile = {
        path: path.resolve(filePath),
        content: formattedCode,
      };

      return file;
    })
  );
};

/**
 * Vue plugin to generate icon files
 * @param options - The options for the plugin
 */
export const vue: MoniconPlugin<VuePluginOptions> = (options) => (payload) => {
  const defaultOptions: VuePluginOptions = {
    suffix: "Icon",
    ...options,
  };

  return {
    name: "monicon-vue-plugin",
    generate: () => generateIconFiles(defaultOptions, payload.icons),
  };
};
