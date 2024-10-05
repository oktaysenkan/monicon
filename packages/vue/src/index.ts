import type { App } from "vue";
import { MoniconProps } from "@monicon/icon-loader";

import Monicon from "./monicon.vue";

export default {
  install: (app: App) => {
    app.component("Monicon", Monicon);
  },
};

export { Monicon, type MoniconProps };
