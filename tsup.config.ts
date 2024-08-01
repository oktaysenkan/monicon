import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.tsx', 'src/babel/index.ts'],
  treeshake: true,
  sourcemap: 'inline',
  minify: true,
  clean: true,
  dts: true,
  splitting: false,
  format: ['cjs', 'esm'],
  external: ['react'],
  injectStyle: false,
});
