import { createApp } from "vue";
import Monicon from "@monicon/vue";

import App from "./App.vue";

import "./style.css";

const app = createApp(App);

app.use(Monicon);

app.mount("#app");
