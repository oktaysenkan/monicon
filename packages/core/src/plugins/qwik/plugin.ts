import { Eta } from "eta";
import * as prettier from "prettier";
import { MoniconPlugin } from "../types";
import template from "./template";
import { generic, GenericPluginOptions } from "../generic";
import { ComponentNameOptions, getComponentName } from "../../utils/name";

export type QwikPluginOptionsInternal = ComponentNameOptions

export type QwikPluginOptions = GenericPluginOptions<QwikPluginOptionsInternal>;

/**
 * Qwik plugin to generate icon files
 * @param options - The options for the plugin
 */
export const qwik: MoniconPlugin<QwikPluginOptions> =
  (_options) => generic({
    name: "monicon-qwik-plugin",
    extension: "tsx",
    content: async (icon) => {
      const options: QwikPluginOptions = {
        suffix: "Icon",
        ..._options,
      };

      const eta = new Eta({ autoEscape: false });

      const componentName = getComponentName(icon, options);

      const fileContent = eta.renderString(template, {
        name: componentName,
        code: icon.svg,
        format: "tsx",
        height: icon.height,
        width: icon.width,
      });

      const fileContentWithProps = fileContent.replace(
        /(<svg\b[^>]*)(?=>)/,
        "$1 {...props}"
      );

      const formattedCode = await prettier.format(fileContentWithProps, {
        parser: "typescript",
      });

      return formattedCode;
    },
    ..._options,
  });
