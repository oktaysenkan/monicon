import type { PluginOption } from "vite";
import { bootstrap, MoniconConfig } from "@monicon/core";

export const monicon = (config?: MoniconConfig): PluginOption => ({
  name: "vite-monicon",
  async buildStart() {
    const isWatching = Boolean(this?.meta?.watchMode);
    console.log({ isWatching });
    await bootstrap({ ...config, watch: isWatching });
  },
  config: () => ({
    server: {
      fs: {
        allow: [".."],
      },
    },
  }),
});

export default monicon;
