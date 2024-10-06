import { defineConfig, Options } from "tsup";

export default defineConfig((options: Options) => ({
  entry: ["src/index.ts", "src/constants.ts"],
  clean: true,
  format: ["cjs", "esm"],
  external: ["react"],
  dts: true,
  ...options,
}));
