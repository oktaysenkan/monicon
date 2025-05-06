import { bootstrap } from "./index";
import { reactTypeScript, svg } from "./plugins";

bootstrap({
  icons: ["mdi:home"],
  plugins: [svg(), reactTypeScript()],
  watch: false,
});
