import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import monicon from "@monicon/vite";

export default defineConfig({
  plugins: [react(), monicon()],
});
