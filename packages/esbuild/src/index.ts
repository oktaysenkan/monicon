import {
  loadIcons,
  getIconsFilePath,
  IconifyOptions,
  getResolveAlias,
} from "@oktaytest/core";
import { Plugin } from "esbuild";

const alias = getResolveAlias();

export const IconifyPlugin = (options: IconifyOptions): Plugin => {
  return {
    name: "esbuild-plugin-iconify",
    setup(build) {
      build.onResolve({ filter: new RegExp(`^${alias}$`) }, (args) => {
        return { path: getIconsFilePath({ ...options, type: "esm" }) };
      });

      build.onStart(async () => {
        await loadIcons({ ...options, type: "esm" });
      });
    },
  };
};
