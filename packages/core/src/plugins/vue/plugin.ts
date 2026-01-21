import { Eta } from "eta";
import * as prettier from "prettier";
import { MoniconPlugin } from "../types";
import templates from "./templates";
import { generic, GenericPluginOptions } from "../generic";
import { ComponentNameOptions, getComponentName } from "../../utils/name";

export type VuePluginOptionsInternal = ComponentNameOptions & {
  template?: "js" | "ts";
}

export type VuePluginOptions = GenericPluginOptions<VuePluginOptionsInternal>;

/**
 * Vue plugin to generate icon files
 * @param options - The options for the plugin
 */
export const vue: MoniconPlugin<VuePluginOptions> = (_options) => generic({
  name: "monicon-vue-plugin",
  extension: "vue",
  content: async (icon) => {
    const options: VuePluginOptions = {
      suffix: "Icon",
      template: "ts",
      outputPath: "src/components/icons",
      ..._options,
    };

    const eta = new Eta({ autoEscape: false });

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

    return formattedCode;
  },
  ..._options,
});