import { Eta } from "eta";
import * as prettier from "prettier";
import { MoniconPlugin } from "../types";
import template from "./templates";
import { generic, GenericPluginOptions } from "../generic";
import { ComponentNameOptions, getComponentName } from "../../utils/name";

export type SveltePluginOptionsInternal = ComponentNameOptions

export type SveltePluginOptions = GenericPluginOptions<SveltePluginOptionsInternal>;

/**
 * Svelte plugin to generate icon files
 * @param options - The options for the plugin
 */
export const svelte: MoniconPlugin<SveltePluginOptions> = (_options) => generic({
  name: "monicon-svelte-plugin",
  extension: "svelte",
  content: async (icon) => {
    const options: SveltePluginOptions = {
      suffix: "Icon",
      outputPath: "'src/lib/components/icons",
      ..._options,
    };

    const eta = new Eta({ autoEscape: false });

    const componentName = getComponentName(icon, options);

    const fileContent = eta.renderString(template, {
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

    return fixedCode;
  },
  ..._options,
});
