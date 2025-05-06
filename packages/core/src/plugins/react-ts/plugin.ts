import path from "node:path";
import slugify from "slugify";
import { Eta } from "eta";
import { htmlToJsx } from "html-to-jsx-transform";
import { format } from "prettier";
import { pascalCase } from "change-case-all";

import { parseIcon, type Icon } from "../../index";
import { MoniconPlugin, MoniconPluginFile } from "../types";
import template from "./template";

slugify.extend({ ":": "/" });

export type ReactTypeScriptPluginOptions = void | {
  outputPath?: ((icon: Icon) => string | undefined) | string;
  componentName?: (icon: Icon) => string | undefined;
  fileName?: (icon: Icon) => string | undefined;
  prefix?: ((icon: Icon) => string | undefined) | string;
  suffix?: ((icon: Icon) => string | undefined) | string;
};

const getComponentName = (
  icon: Icon,
  options: ReactTypeScriptPluginOptions
) => {
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

const getFileName = (icon: Icon, options: ReactTypeScriptPluginOptions) => {
  const defaultFileName = slugify(icon.name, { lower: true, remove: /:/g });

  return typeof options?.fileName === "function"
    ? (options.fileName(icon) ?? defaultFileName)
    : (options?.fileName ?? defaultFileName);
};

const getOutputPath = (icon: Icon, options: ReactTypeScriptPluginOptions) => {
  const defaultOutputPath = "src/components/icons";

  if (!options?.outputPath) {
    return defaultOutputPath;
  }

  return typeof options.outputPath === "function"
    ? (options.outputPath(icon) ?? defaultOutputPath)
    : (options.outputPath ?? defaultOutputPath);
};

/**
 * Generate React TypeScript icon files
 * @param icons - The icons to generate
 * @param outputPath - The path to output the icons to
 */
const generateIconFiles = (
  options: ReactTypeScriptPluginOptions,
  icons: Icon[]
): Promise<MoniconPluginFile[]> => {
  const eta = new Eta({ autoEscape: false });

  return Promise.all(
    icons.map(async (icon) => {
      const fileName = getFileName(icon, options);
      const componentName = getComponentName(icon, options);

      const reactCode = htmlToJsx(icon.svg);

      const fileContent = eta.renderString(template, {
        name: componentName,
        code: reactCode,
      });

      const fileContentWithProps = fileContent.replace(
        /(<svg\b[^>]*)(?=>)/,
        "$1 {...props}"
      );

      const formattedCode = await format(fileContentWithProps, {
        parser: "typescript",
      });

      const outputPath = getOutputPath(icon, options);

      const filePath = path.join(outputPath, `${fileName}.tsx`);

      const file: MoniconPluginFile = {
        path: path.resolve(filePath),
        content: formattedCode,
      };

      return file;
    })
  );
};

/**
 * React TypeScript plugin to generate icon files
 * @param options - The options for the plugin
 */
export const reactTypeScript: MoniconPlugin<ReactTypeScriptPluginOptions> =
  (options) => (payload) => {
    const defaultOptions: ReactTypeScriptPluginOptions = {
      suffix: "Icon",
      ...options,
    };

    return {
      name: "monicon-react-typescript-plugin",
      onStart: () => generateIconFiles(defaultOptions, payload.icons),
      onUpdate: () => generateIconFiles(defaultOptions, payload.icons),
    };
  };
