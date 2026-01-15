import { debuggerPlugin, qwik, clean } from "@monicon/core/plugins";
// import {
//   loadJSONCollection,
//   loadLocalCollection,
//   loadRemoteCollection,
// } from "@monicon/core/loaders";
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
  collections: [],
  loaders: {
    // local: loadLocalCollection("../../packages/icons"),
    // json: loadJSONCollection(
    //   "https://gist.githubusercontent.com/oktaysenkan/39681ecdb066dc44c52fa840dacc7562/raw/6aa7b8f8bf9d806742be0e1c4759809391d00bcd/icons.json"
    // ),
    // remote: loadRemoteCollection({
    //   download: "https://api.iconify.design/lucide:cloud-download.svg",
    //   attachment: "https://api.iconify.design/ri:attachment-2.svg",
    // }),
  },
  plugins: [
    clean({ patterns: ["src/components/icons"] }),
    qwik({ outputPath: "src/components/icons" }),
    debuggerPlugin(),
  ],
} satisfies MoniconConfig;
