import type { App } from "vue";
import { IconifyProps } from "@oktaytest/icon-loader";

import Iconify from "./Iconify.vue";

export default {
  install: (app: App) => {
    app.component("Iconify", Iconify);
  },
};

export { Iconify, type IconifyProps };
