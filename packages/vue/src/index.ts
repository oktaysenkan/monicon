import type { App } from "vue";
import Iconify from "./Iconify.vue";

export default {
  install: (app: App) => {
    app.component("Iconify", Iconify);
  },
};

export { Iconify };
