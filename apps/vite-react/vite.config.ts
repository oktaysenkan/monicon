import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import monicon from "@monicon/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), monicon({ outputFileName: "vite-react" })],
});
