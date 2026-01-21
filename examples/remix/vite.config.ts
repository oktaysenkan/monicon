import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import monicon from "@monicon/vite";

export default defineConfig({
  plugins: [remix(), tsconfigPaths(), monicon()],
});
