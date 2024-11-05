import { defineConfig, Options } from "tsup";

export default defineConfig((options: Options) => ({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  external: ["@monicon/runtime"],
  ...options,
}));
