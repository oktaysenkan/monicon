import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { IconifyPlugin } from "@monicon/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    IconifyPlugin({
      icons: [
        "mdi:home",
        "mdi:account",
        "mdi:account-badge-outline",
        "feather:activity",
        "feather:alert-circle",
        "logos:active-campaign",
        "logos:apache-superset-icon",
      ],
      outputFileName: "vite-vue",
    }),
  ],
});
