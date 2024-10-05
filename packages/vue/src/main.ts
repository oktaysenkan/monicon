import type { App } from "vue";
import { IconifyProps } from "@monicon/icon-loader";

import Iconify from "./Iconify.vue";

export default {
  install: (app: App) => {
    app.component("Iconify", Iconify);
  },
};

export { Iconify, type IconifyProps };
