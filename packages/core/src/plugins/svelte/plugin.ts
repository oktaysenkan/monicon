import { pascalCase } from "change-case-all";
import { Eta } from "eta";
import path from "node:path";
import * as prettier from "prettier";
import slugify from "slugify";
import type { Icon } from "../../types";
import { parseIcon } from "../../utils/icon-processor";
import { MoniconPlugin, MoniconPluginFile } from "../types";
import template from "./templates";

slugify.extend({ ":": "/" });

export type SveltePluginOptions = {
  outputPath?: ((icon: Icon) => string | undefined) | string;
  componentName?: (icon: Icon) => string | undefined;
  fileName?: (icon: Icon) => string | undefined;
  prefix?: ((icon: Icon) => string | undefined) | string;
  suffix?: ((icon: Icon) => string | undefined) | string;
} | void;

const getComponentName = (icon: Icon, options: SveltePluginOptions) => {
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

const getFileName = (icon: Icon, options: SveltePluginOptions) => {
  const defaultFileName = slugify(icon.name, { lower: true, remove: /:/g });

  return typeof options?.fileName === "function"
    ? (options.fileName(icon) ?? defaultFileName)
    : (options?.fileName ?? defaultFileName);
};

const getOutputPath = (icon: Icon, options: SveltePluginOptions) => {
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
  options: SveltePluginOptions,
  icons: Icon[]
): Promise<MoniconPluginFile[]> => {
  const eta = new Eta({ autoEscape: false });

  return Promise.all(
    icons.map(async (icon) => {
      const fileName = getFileName(icon, options);
      const componentName = getComponentName(icon, options);

      const templateContent = template;

      const fileContent = eta.renderString(templateContent, {
        name: componentName,
        code: icon.svg,
        height: icon.height,
        width: icon.width,
      });

      const fileContentWithProps = fileContent.replace(
        /(<svg\b[^>]*)(?=>)/,
        "$1 {...$$$restProps}"
      );

      const formattedCode = await prettier.format(fileContentWithProps, {
        parser: "babel",
      });

      // TODO: prettier-plugin-svelte
      const fixedCode = formattedCode.replace(";", "");

      const outputPath = getOutputPath(icon, options);

      const filePath = path.join(outputPath, `${fileName}.svelte`);

      const file: MoniconPluginFile = {
        path: path.resolve(filePath),
        content: fixedCode,
      };

      return file;
    })
  );
};

/**
 * Svelte plugin to generate icon files
 * @param options - The options for the plugin
 */
export const svelte: MoniconPlugin<SveltePluginOptions> =
  (options) => (payload) => {
    const defaultOptions: SveltePluginOptions = {
      suffix: "Icon",
      ...options,
    };

    return {
      name: "monicon-svelte-plugin",
      generate: () => generateIconFiles(defaultOptions, payload.icons),
    };
  };
