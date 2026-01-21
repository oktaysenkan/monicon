import { bootstrap, MoniconConfig } from "@monicon/core";
import type { Plugin } from "esbuild";

export const monicon = (options?: MoniconConfig): Plugin => {
  return {
    name: "esbuild-monicon",
    setup(build) {
      build.onStart(async () => {
        await bootstrap(options);
      });
    },
  };
};

export default monicon;
