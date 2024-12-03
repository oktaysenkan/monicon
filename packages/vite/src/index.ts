import { Plugin } from "vite";
import {
  loadIcons,
  getIconsFilePath,
  MoniconOptions,
  getResolveAlias,
} from "@monicon/core";

const alias = getResolveAlias();

const name = "vite-monicon";

export const monicon = async (options: MoniconOptions): Promise<Plugin[]> => [
  {
    name,
    async buildStart() {
      await loadIcons({ type: "esm", ...options });
    },
    async resolveId(source) {
      if (source === alias)
        return getIconsFilePath({ type: "esm", ...options });

      return null;
    },
  },
];

export default monicon;
