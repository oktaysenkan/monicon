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
        return getIconsFilePath({ ...options, type: "esm" });

      return null;
    },
    async buildStart() {
      await loadIcons({ ...options, type: "esm" });
    },
  },
];
