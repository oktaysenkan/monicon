import { defineConfig, Options } from "tsup";

export default defineConfig((options: Options) => ({
  entry: [
    "src/index.ts",
    "src/plugins/index.ts",
    "src/loaders/index.ts",
    "src/cli.ts",
  ],
  clean: true,
  format: ["cjs", "esm"],
  splitting: false,
  dts: true,
  ...options,
}));
