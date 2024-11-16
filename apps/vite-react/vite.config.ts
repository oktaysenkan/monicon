import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import monicon from "@monicon/vite";
import { localLoader, mockLoader, remoteLoader } from "@monicon/loader";

export default defineConfig({
  plugins: [
    react(),
    monicon({
      icons: [
        "mdi:home",
        "mdi:account",
        "mdi:account-badge-outline",
        "feather:activity",
        "feather:alert-circle",
        "logos:active-campaign",
        "logos:apache-superset-icon",
        "lucide:badge-check",
      ],
      collections: ["lucide"],
      customCollections: {
        mock: mockLoader(),
        remote: remoteLoader({ url: "" }),
        local: localLoader({ directory: "" }),
      },
      outputFileName: "vite-react",
    }),
  ],
});
