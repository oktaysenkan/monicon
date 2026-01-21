import { defineConfig, Options } from "tsup";

export default defineConfig((options: Options) => ({
  entry: {
    index: "src/index.ts",
  },
  clean: true,
  format: ["cjs", "esm"],
  external: ["react"],
  splitting: false,
  dts: true,
  ...options,
}));
