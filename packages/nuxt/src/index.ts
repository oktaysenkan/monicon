import { addComponent, defineNuxtModule } from "@nuxt/kit";
import { MoniconBundlerOptions } from "@monicon/core";
import moniconVitePlugin from "@monicon/vite";
import MoniconWebpackPlugin from "@monicon/webpack";

const defaultOptions: MoniconBundlerOptions = {
  type: "esm",
};

export default defineNuxtModule<MoniconBundlerOptions>({
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

    nuxt.hook("webpack:config", async (configs: any[]) => {
      configs.forEach((config) => {
        config.plugins = config.plugins || [];
        config.plugins.unshift(new MoniconWebpackPlugin(options));
      });
    });

    nuxt.hook("vite:extend", async (vite: any) => {
      vite.config.plugins = vite.config.plugins || [];
      vite.config.plugins.push(moniconVitePlugin(options));
    });
  },
});
