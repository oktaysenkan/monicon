import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { getResolveAlias } from "@monicon/core";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: "src/index.ts",
      name: "Monicon",
      formats: ["es", "umd"],
      fileName: "monicon",
    },
    rollupOptions: {
      input: {
        main: "src/index.ts",
      },
      external: ["vue", getResolveAlias()],
      output: {
        exports: "named",
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
