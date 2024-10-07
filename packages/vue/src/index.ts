import type { App } from "vue";
export type { MoniconProps } from "@monicon/icon-loader";

import Monicon from "./monicon.vue";

export default {
  install: (app: App) => {
    app.component("Monicon", Monicon);
  },
};

export { Monicon };
