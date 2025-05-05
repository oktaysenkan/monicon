import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import replace from "@rollup/plugin-replace";
import monicon from "@monicon/rollup";
import serve from "rollup-plugin-serve";

const isDev = process.env.NODE_ENV === "development";

/** @type {import('rollup')} */
export default {
  input: "src/index.js",
  output: {
    file: "public/bundle.js",
    format: "iife",
    inlineDynamicImports: true,
  },
  plugins: [
    nodeResolve({
      extensions: [".js", ".jsx"],
    }),
    monicon({
      icons: ["mdi:home"],
    }),
    babel(),
    commonjs(),
    replace({
      preventAssignment: false,
      "process.env.NODE_ENV": '"development"',
    }),
    ...(isDev ? [serve("public")] : []),
  ],
};
