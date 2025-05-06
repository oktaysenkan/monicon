import { bootstrap } from "./index";
import { svg, reactTypeScript } from "./plugins";

bootstrap({
  icons: ["mdi:home"],
  plugins: [svg(), reactTypeScript()],
  watch: false,
});
