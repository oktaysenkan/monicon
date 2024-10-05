import { addComponent, defineNuxtModule } from "@nuxt/kit";
import {
  getIconsFilePath,
  getResolveAlias,
  loadIcons,
  type IconifyOptions,
} from "@monicon/core";

const defaultOptions: IconifyOptions = {
  icons: [],
  type: "esm",
};

export default defineNuxtModule<IconifyOptions>({
  meta: {
    name: "nuxt-iconify",
    configKey: "iconify",
  },
  defaults: defaultOptions,
  async setup(options, nuxt) {
    addComponent({
      name: "Iconify",
      export: "Iconify",
      filePath: "@monicon/vue",
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
