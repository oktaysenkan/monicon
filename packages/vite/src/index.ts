import type { PluginOption } from "vite";
import {
  loadIcons,
  getIconsFilePath,
  MoniconOptions,
  getResolveAlias,
} from "@monicon/core";

const alias = getResolveAlias();

const name = "vite-monicon";

export const monicon = (options: MoniconOptions): PluginOption => ({
  name,
  async buildStart() {
    await loadIcons({ type: "esm", ...options });
  },
  async resolveId(source) {
    if (source === alias) return getIconsFilePath({ type: "esm", ...options });

    return null;
  },
  config: () => ({
    server: {
      fs: {
        allow: [".."],
      },
    },
    optimizeDeps: {
      exclude: [alias],
    },
  }),
});

export default monicon;
