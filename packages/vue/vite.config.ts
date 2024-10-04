import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import { getResolveAlias } from "@oktaytest/core";
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
      name: "Iconify",
      formats: ["es", "cjs", "umd"],
      fileName: "iconify",
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
          oktay: "Oktay",
        },
      },
    },
  },
});
