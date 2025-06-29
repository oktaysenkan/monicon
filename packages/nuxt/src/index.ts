import { defineNuxtModule } from "@nuxt/kit";
import { bootstrap, MoniconConfig } from "@monicon/core";

const defaultOptions: MoniconConfig = {
  icons: [],
};

let alreadyBootstrapped = false;

const runOnce = async (fn: Promise<void>) =>
  new Promise((resolve) => {
    let isRunning = false;

    return async () => {
      if (isRunning) return;
      isRunning = true;
      await fn;
      resolve(true);
    };
  });

export default defineNuxtModule<MoniconConfig>({
  meta: {
    name: "nuxt-monicon",
    configKey: "monicon",
  },
  defaults: defaultOptions,
  async setup(options, nuxt) {
    nuxt.hook("build:before", async () => {
      if (alreadyBootstrapped) return;
      alreadyBootstrapped = true;

      await bootstrap({ ...options, watch: nuxt.options.dev });
    });
  },
});
