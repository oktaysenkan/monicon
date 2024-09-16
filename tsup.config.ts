import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src'],
  treeshake: true,
  sourcemap: 'inline',
  minify: true,
  clean: true,
  dts: true,
  splitting: false,
  format: ['cjs', 'esm'],
  external: ['react', 'react-native', 'react-native-svg'],
  injectStyle: false,
});
