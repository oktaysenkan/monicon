import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import monicon from "@monicon/vite";
import { localLoader, JSONLoader, remoteLoader } from "@monicon/loader";

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
        local: localLoader("../../packages/icons"),
        json: JSONLoader(
          "https://gist.githubusercontent.com/oktaysenkan/39681ecdb066dc44c52fa840dacc7562/raw/6aa7b8f8bf9d806742be0e1c4759809391d00bcd/icons.json"
        ),
        remote: remoteLoader({
          download: "https://api.iconify.design/lucide:cloud-download.svg",
          attachment: "https://api.iconify.design/ri:attachment-2.svg",
        }),
      },
      outputFileName: "vite-react",
    }),
  ],
});
