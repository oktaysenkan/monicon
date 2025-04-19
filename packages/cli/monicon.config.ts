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
  outputPath: "./.monicon/components/icons",
  watch: false,
} satisfies MoniconConfig;
