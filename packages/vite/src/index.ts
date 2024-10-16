import { PluginOption } from "vite";
import {
  getIconsFilePath,
  getResolveAlias,
  watchConfig,
  MoniconBundlerOptions,
} from "@monicon/core";

const alias = getResolveAlias();

const name = "vite-monicon";

export const monicon = (options?: MoniconBundlerOptions): PluginOption[] => [
  {
    name,
    async buildStart() {
      await watchConfig({ type: "esm", ...options });
    },
    async resolveId(source) {
      if (source === alias)
        return getIconsFilePath({ type: "esm", ...options });

      return null;
    },
  },
];

export default monicon;
