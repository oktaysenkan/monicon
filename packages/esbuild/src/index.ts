import {
  loadIcons,
  getIconsFilePath,
  IconifyOptions,
  getResolveAlias,
} from "@monicon/core";
import { Plugin } from "esbuild";

const alias = getResolveAlias();

export const IconifyPlugin = (options: IconifyOptions): Plugin => {
  return {
    name: "esbuild-plugin-iconify",
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
