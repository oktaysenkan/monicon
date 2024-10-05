import { defineConfig, Options } from "tsup";

export default defineConfig((options: Options) => ({
  entry: ["src/index.ts", "src/Iconify.tsx"],
  banner: {
    js: "'use client'",
  },
  clean: true,
  format: ["cjs", "esm"],
  external: ["react", "oktay", "react-native"],
  dts: true,
  ...options,
}));
