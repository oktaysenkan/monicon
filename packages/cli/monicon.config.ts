import { debuggerPlugin, react, clean } from "@monicon/core/plugins";
import { type MoniconConfig } from "@monicon/core";

export default {
  icons: [
    "mdi:home",
    "mdi:account",
    "mdi:account-badge-outline",
    "feather:activity",
    "feather:alert-circle",
    "logos:active-campaign",
    "logos:atom-icon",
    "logos:apache",
    "lucide:badge-check",
    "lucide:cloud-download",
    "lucide:attachment-2",
  ],
  plugins: [
    clean({ patterns: ["src/components/icons"] }),
    react({ outputPath: "src/components/icons" }),
    debuggerPlugin(),
  ],
  watch: true,
} satisfies MoniconConfig;
