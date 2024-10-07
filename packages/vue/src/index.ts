import type { App } from "vue";

import Monicon, { MoniconProps } from "./monicon.vue";

export default {
  install: (app: App) => {
    app.component("Monicon", Monicon);
  },
};

export { Monicon, type MoniconProps };
