import type { PluginOption } from "vite";
import { bootstrap, MoniconConfig } from "@monicon/core";

export const monicon = (config: MoniconConfig): PluginOption => ({
  name: "vite-monicon",
  async buildStart() {
    await bootstrap(config);
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
