import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import monicon from "@monicon/vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss(), monicon()],
});
