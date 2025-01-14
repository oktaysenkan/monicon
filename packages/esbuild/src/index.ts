import {
  loadIcons,
  getIconsFilePath,
  MoniconOptions,
  getResolveAlias,
} from "@monicon/core";
import type { Plugin } from "esbuild";

const alias = getResolveAlias();

const name = "esbuild-monicon";

export const monicon = (options: MoniconOptions): Plugin => {
  return {
    name,
    setup(build) {
      build.onResolve({ filter: new RegExp(`^${alias}$`) }, (args) => {
        return { path: getIconsFilePath({ type: "esm", ...options }) };
      });

      build.onStart(async () => {
        await loadIcons({ type: "esm", ...options });
      });
    },
  };
};

export default monicon;
