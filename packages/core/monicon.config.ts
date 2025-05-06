import { MoniconConfig } from "./src";
import {
  loadJSONCollection,
  loadLocalCollection,
  loadRemoteCollection,
} from "./src/loaders";
import { debuggerPlugin, reactTypeScript, svg } from "./src/plugins";

export default {
  icons: ["ic:baseline-chat", "mdi:home"],
  // collections: ["ei", "fad"],
  plugins: [svg(), reactTypeScript(), debuggerPlugin()],
  // loaders: {
  //   local: loadLocalCollection("local"),
  //   json: loadJSONCollection(
  //     "https://gist.githubusercontent.com/oktaysenkan/39681ecdb066dc44c52fa840dacc7562/raw/6aa7b8f8bf9d806742be0e1c4759809391d00bcd/icons.json"
  //   ),
  //   remote: loadRemoteCollection({
  //     download: "https://api.iconify.design/lucide:cloud-download.svg",
  //     attachment: "https://api.iconify.design/ri:attachment-2.svg",
  //   }),
  // },
  watch: false,
} satisfies MoniconConfig;
