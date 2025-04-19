import {
  loadJSONCollection,
  loadLocalCollection,
  loadRemoteCollection,
} from "@monicon/loader";
import { MoniconConfig } from "./src";
import { svg } from "./src/plugins/svg";

export default {
  icons: [
    "logos:dribbble",
    "ic:baseline-chat",
    "ic:baseline-cloud",
    "mdi:home",
    "mdi:user",
  ],
  plugins: [svg()],
  loaders: {
    local: loadLocalCollection("local"),
    json: loadJSONCollection(
      "https://gist.githubusercontent.com/oktaysenkan/39681ecdb066dc44c52fa840dacc7562/raw/6aa7b8f8bf9d806742be0e1c4759809391d00bcd/icons.json"
    ),
    remote: loadRemoteCollection({
      download: "https://api.iconify.design/lucide:cloud-download.svg",
      attachment: "https://api.iconify.design/ri:attachment-2.svg",
    }),
  },
  outputPath: ".monicon/components/icons",
  watch: false,
} satisfies MoniconConfig;
