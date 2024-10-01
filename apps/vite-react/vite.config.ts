import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { IconifyPlugin } from "@oktaytest/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
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
    }),
  ],
});
