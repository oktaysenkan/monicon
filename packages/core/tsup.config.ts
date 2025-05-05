import { defineConfig, Options } from "tsup";

export default defineConfig((options: Options) => ({
  entry: ["src/index.ts", "src/plugins/index.ts", "src/loaders/index.ts"],
  clean: true,
  format: ["cjs", "esm"],
  dts: true,
  publicDir: "src",
  ...options,
}));
