import {
  getIconsFilePath,
  getResolveAlias,
  MoniconBundlerOptions,
  watchConfig,
} from "@monicon/core";
import { Plugin } from "esbuild";

const alias = getResolveAlias();

const name = "esbuild-monicon";

export const monicon = (options?: MoniconBundlerOptions): Plugin => {
  return {
    name,
    setup(build) {
      build.onResolve({ filter: new RegExp(`^${alias}$`) }, async () => {
        return { path: getIconsFilePath({ type: "esm", ...options }) };
      });

      build.onStart(async () => {
        await watchConfig({ type: "esm", ...options });
      });
    },
  };
};

export default monicon;
