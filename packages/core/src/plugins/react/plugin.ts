import { Eta } from "eta";
import { htmlToJsx } from "html-to-jsx-transform";
import * as prettier from "prettier";
import { MoniconPlugin } from "../types";
import templates from "./templates";
import { generic, GenericPluginOptions } from "../generic";
import { ComponentNameOptions, getComponentName } from "../../utils/name";

export type ReactPluginOptionsInternal = ComponentNameOptions & {
  format?: "jsx" | "tsx";
}

export type ReactPluginOptions = GenericPluginOptions<ReactPluginOptionsInternal>;

/**
 * React plugin to generate icon files
 * @param options - The options for the plugin
 */
export const react: MoniconPlugin<ReactPluginOptions> =
  (_options) => generic({
    name: "monicon-react-plugin",
    extension: _options?.format ?? "tsx",
    content: async (icon) => {
      const options: ReactPluginOptions = {
        suffix: "Icon",
        ..._options,
      };

      const eta = new Eta({ autoEscape: false });

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

      return formattedCode;
    },
    ..._options,
  });
