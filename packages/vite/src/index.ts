import { PluginOption } from "vite";
import { loadIcons, getIconsFilePath } from "@oktaytest/core";

interface IconifyOptions {
  icons: string[];
}

export const IconifyPlugin = (options: IconifyOptions): PluginOption[] => [
  {
    name: "vite-plugin-iconify",
    resolveId(source) {
      if (source === "oktay") return getIconsFilePath("esm");

      return null;
    },
    async buildStart() {
      await loadIcons(options.icons ?? [], "esm");
    },
  },
];
