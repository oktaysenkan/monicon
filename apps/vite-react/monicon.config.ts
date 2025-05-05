import { reactTypeScript } from "@monicon/core/plugins";
import {
  loadJSONCollection,
  loadLocalCollection,
  loadRemoteCollection,
} from "@monicon/core/loaders";

export default {
  icons: [
    "mdi:home",
    "mdi:account",
    "mdi:account-badge-outline",
    "feather:activity",
    "feather:alert-circle",
    "logos:active-campaign",
    "logos:apache-superset-icon",
    "lucide:badge-check",
    "lucide:cloud-download",
    "lucide:attachment-2",
  ],
  collections: ["lucide"],
  loaders: {
    local: loadLocalCollection("../../packages/icons"),
    json: loadJSONCollection(
      "https://gist.githubusercontent.com/oktaysenkan/39681ecdb066dc44c52fa840dacc7562/raw/6aa7b8f8bf9d806742be0e1c4759809391d00bcd/icons.json"
    ),
    remote: loadRemoteCollection({
      download: "https://api.iconify.design/lucide:cloud-download.svg",
      attachment: "https://api.iconify.design/ri:attachment-2.svg",
    }),
  },
  plugins: [reactTypeScript()],
};
