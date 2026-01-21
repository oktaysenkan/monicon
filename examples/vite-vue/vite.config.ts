import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import monicon from "@monicon/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), monicon()],
});
