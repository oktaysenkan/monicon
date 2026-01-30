import { bootstrap, MoniconConfig } from "@monicon/core";
import type { Plugin } from "esbuild";

const pluginName = "esbuild-monicon";

export const monicon = (options?: MoniconConfig): Plugin => {
  let bootstrapPromise: Promise<void> | null = null;

  return {
    name: pluginName,
    setup(build) {
      build.onStart(() => {
        if (!bootstrapPromise) {
          bootstrapPromise = bootstrap(options);
        }

        return bootstrapPromise;
      });
    },
  };
};

export default monicon;
