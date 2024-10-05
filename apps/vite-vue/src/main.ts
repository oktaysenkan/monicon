import { createApp } from "vue";
import Iconify from "@monicon/vue";

import App from "./App.vue";

import "./style.css";

const app = createApp(App);

app.use(Iconify);

app.mount("#app");
