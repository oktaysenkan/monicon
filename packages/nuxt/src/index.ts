import { defineNuxtModule } from "@nuxt/kit";
import { MoniconConfig } from "@monicon/core";
import moniconVitePlugin from "@monicon/vite";
import MoniconWebpackPlugin from "@monicon/webpack";

const defaultOptions: MoniconConfig = {
  icons: [],
};

export default defineNuxtModule<MoniconConfig>({
  meta: {
    name: "nuxt-monicon",
    configKey: "monicon",
  },
  defaults: defaultOptions,
  async setup(options, nuxt) {
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
