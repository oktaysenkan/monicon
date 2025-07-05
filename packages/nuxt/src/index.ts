import { defineNuxtModule } from "@nuxt/kit";
import { bootstrap, MoniconConfig } from "@monicon/core";

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
    nuxt.hook(
      "build:before",
      async () => await bootstrap({ watch: nuxt.options.dev, ...options })
    );
  },
});
