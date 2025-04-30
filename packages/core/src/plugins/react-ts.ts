import {
  parseIcon,
  type Icon,
  type MoniconPluginPayload,
  type MoniconPlugin,
} from "..";
import { mkdirSync, writeFileSync } from "fs";
import path, { dirname } from "path";
import slugify from "slugify";
import { Eta } from "eta";
import { camelCase, startCase } from "lodash";
import { htmlToJsx } from "html-to-jsx-transform";
import { format } from "prettier";
import { fileURLToPath } from "url";

export type ReactTypeScriptPluginOptions = void | {
  outputPath?: ((icon: Icon) => string | undefined) | string;
  componentName?: (icon: Icon) => string | undefined;
  fileName?: (icon: Icon) => string;
  prefix?: ((icon: Icon) => string | undefined) | string;
  suffix?: ((icon: Icon) => string | undefined) | string;
};

const pascalCase = (value: string) =>
  startCase(camelCase(value)).replace(/ /g, "");

const getComponentName = (
  icon: Icon,
  options: ReactTypeScriptPluginOptions
) => {
  const parsedIcon = parseIcon(icon.name);
  const componentName = pascalCase(parsedIcon.name);

  const prefix =
    typeof options?.prefix === "function"
      ? options.prefix(icon)
      : options?.prefix ?? "";

  const suffix =
    typeof options?.suffix === "function"
      ? options.suffix(icon)
      : options?.suffix ?? "";

  const isConfigured = Boolean(options?.componentName ?? prefix ?? suffix);

  if (!isConfigured) return `${componentName}Icon`;

  return `${prefix}${componentName}${suffix}`;
};

const getOutputPath = (
  icon: Icon,
  options: ReactTypeScriptPluginOptions,
  payload: MoniconPluginPayload
) => {
  if (!options?.outputPath || !payload.config.outputPath) {
    const currentFile = fileURLToPath(import.meta.url);
    const currentDir = dirname(currentFile);

    const outputPath = path.join(currentDir, "src/components/icons");

    return outputPath;
  }

  if (options.outputPath) {
    return typeof options.outputPath === "function"
      ? options.outputPath(icon) || payload.config.outputPath
      : options.outputPath;
  }

  return payload.config.outputPath;
};
/**
 * Generate React TypeScript icon files
 * @param icons - The icons to generate
 * @param outputPath - The path to output the icons to
 */
const generateIconFiles = (
  options: ReactTypeScriptPluginOptions,
  payload: MoniconPluginPayload
) => {
  const eta = new Eta({
    views: path.join(__dirname, "..", "templates"),
    autoEscape: false,
  });

  payload.icons.forEach(async (icon) => {
    const defaultFileName = slugify(icon.name, { lower: true, remove: /:/g });

    const fileName =
      typeof options?.fileName === "function"
        ? options.fileName(icon)
        : options?.fileName ?? defaultFileName;

    const componentName = getComponentName(icon, options);

    const reactCode = htmlToJsx(icon.svg);

    const fileContent = eta.render("react-ts", {
      name: `${componentName}Icon`,
      code: reactCode,
    });

    const fileContentWithProps = fileContent.replace(
      /(<svg\b[^>]*)(?=>)/,
      "$1 {...props}"
    );

    const formattedCode = await format(fileContentWithProps, {
      parser: "typescript",
    });

    const outputPath = getOutputPath(icon, options, payload);

    const filePath = path.join(outputPath, `${fileName}.tsx`);
    const directory = path.dirname(filePath);

    mkdirSync(directory, { recursive: true });
    writeFileSync(filePath, formattedCode, { flag: "w" });
  });
};

/**
 * React TypeScript plugin to generate icon files
 * @param options - The options for the plugin
 */
export const reactTypeScript: MoniconPlugin<ReactTypeScriptPluginOptions> =
  (options) => (payload) => {
    return {
      name: "monicon-react-typescript-plugin",
      onStart: () => generateIconFiles(options, payload),
      onUpdate: () => generateIconFiles(options, payload),
    };
  };
