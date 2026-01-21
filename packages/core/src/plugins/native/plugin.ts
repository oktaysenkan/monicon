import { Eta } from "eta";
import * as prettier from "prettier";
import { MoniconPlugin } from "../types";
import templates from "./templates";
import { generic, GenericPluginOptions } from "../generic";
import { ComponentNameOptions, getComponentName } from "../../utils/name";

export type ReactNativePluginOptionsInternal = ComponentNameOptions & {
  format?: "jsx" | "tsx";
}

export type ReactNativePluginOptions = GenericPluginOptions<ReactNativePluginOptionsInternal>;

/**
 * React Native plugin to generate icon files
 * @param options - The options for the plugin
 */
export const reactNative: MoniconPlugin<ReactNativePluginOptions> =
  (_options) => generic({
    name: "monicon-react-native-plugin",
    extension: _options?.format ?? "tsx",
    content: async (icon) => {
      const options: ReactNativePluginOptions = {
        suffix: "Icon",
        ..._options,
      };

      const eta = new Eta({ autoEscape: false });

      const componentName = getComponentName(icon, options);

      const fileFormat = options?.format ?? "tsx";

      const templateContent = templates[fileFormat];

      const fileContent = eta.renderString(templateContent, {
        name: componentName,
        code: icon.svg,
        format: fileFormat,
        height: icon.height,
        width: icon.width,
      });

      const formattedCode = await prettier.format(fileContent, {
        parser: fileFormat === "tsx" ? "typescript" : "babel",
      });

      return formattedCode;
    },
    ..._options,
  });
