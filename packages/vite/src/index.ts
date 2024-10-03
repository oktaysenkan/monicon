import { PluginOption } from "vite";
import {
  loadIcons,
  getIconsFilePath,
  IconifyOptions,
  getResolveAlias,
} from "@oktaytest/core";

const alias = getResolveAlias();

export const IconifyPlugin = (options: IconifyOptions): PluginOption[] => [
  {
    name: "vite-plugin-iconify",
    resolveId(source) {
      if (source === alias)
        return getIconsFilePath({ type: "esm", ...options });

      return null;
    },
    async buildStart() {
      await loadIcons({ type: "esm", ...options });
    },
  },
];
