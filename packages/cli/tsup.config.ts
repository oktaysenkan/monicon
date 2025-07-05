import { defineConfig, Options } from "tsup";

export default defineConfig((options: Options) => ({
  entry: ["src/index.ts"],
  clean: true,
  format: ["cjs", "esm"],
  dts: true,
  minify: false,
  outDir: "dist/",
  sourcemap: false,
  bundle: true,
  splitting: false,
  outExtension(ctx) {
    return {
      dts: ".d.ts",
      js: ctx.format === "cjs" ? ".cjs" : ".mjs",
    };
  },
  treeshake: false,
  target: "es6",
  platform: "node",
  tsconfig: "./tsconfig.json",
  cjsInterop: true,
  keepNames: true,
  skipNodeModulesBundle: false,
  ...options,
}));
