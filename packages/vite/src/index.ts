import type { PluginOption } from "vite";
import { bootstrap, MoniconConfig } from "@monicon/core";

let isBootstrapped = false;

export const monicon = (config?: MoniconConfig): PluginOption => {
  return {
    name: "vite-monicon",
    async buildStart() {
      if (isBootstrapped) return;

      isBootstrapped = true;

      const isWatching =
        Boolean(this?.meta?.watchMode) ||
        process.env.NODE_ENV === "development";

      await bootstrap({ watch: isWatching, ...config });
    },
    config: () => ({
      server: {
        fs: {
          allow: [".."],
        },
      },
    }),
  };
};

export default monicon;
