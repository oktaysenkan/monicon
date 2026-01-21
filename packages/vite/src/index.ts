import type { PluginOption } from "vite";
import { bootstrap, MoniconConfig } from "@monicon/core";

// Remix's vite plugin calls resolveId before buildStart, so we need to wait for the bootstrap to complete before resolving the id.
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
    },
    resolveId: async () => {
      await bootstrapPromise;

      return;
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
