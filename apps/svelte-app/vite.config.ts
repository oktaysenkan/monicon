import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { IconifyPlugin } from "@oktaytest/vite";

export default defineConfig({
  plugins: [
    sveltekit(),
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
      outputFileName: "svelte-app",
    }),
  ],
});
