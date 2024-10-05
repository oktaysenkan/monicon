import { addComponent, defineNuxtModule } from "@nuxt/kit";
import {
  getIconsFilePath,
  getResolveAlias,
  loadIcons,
  MoniconOptions,
} from "@monicon/core";

const defaultOptions: MoniconOptions = {
  icons: [],
  type: "esm",
};

export default defineNuxtModule<MoniconOptions>({
  meta: {
    name: "nuxt-monicon",
    configKey: "monicon",
  },
  defaults: defaultOptions,
  async setup(options, nuxt) {
    addComponent({
      name: "Monicon",
      export: "Monicon",
      filePath: "@monicon/vue",
      kebabName: "monicon",
      pascalName: "Monicon",
    });

    const alias = getResolveAlias();

    nuxt.options.alias = {
      ...nuxt.options.alias,
      [alias]: getIconsFilePath(options),
    };

    nuxt.addHooks({
      "app:resolve": async () => {
        await loadIcons(options);
      },
    });
  },
});
