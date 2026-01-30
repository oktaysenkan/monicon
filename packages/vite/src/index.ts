import type { PluginOption } from "vite";
import { bootstrap, MoniconConfig } from "@monicon/core";

let bootstrapPromise: Promise<void> | null = null;

export const monicon = (config?: MoniconConfig): PluginOption => {
  return {
    name: "vite-monicon",
    async buildStart() {
      if (bootstrapPromise) return;

      const isWatching =
        Boolean(this?.meta?.watchMode) ||
        process.env.NODE_ENV === "development";

      bootstrapPromise = bootstrap({ watch: isWatching, ...config });

      await bootstrapPromise;
    },
    config: async () => {
      return {
        server: {
          fs: {
            allow: [".."],
          },
        },
      };
    },
  };
};

export default monicon;
