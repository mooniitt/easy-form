import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
const path = require("path");

export default [
  // browser-friendly UMD build
  {
    input: "lib/index.js",
    output: {
      file: path.resolve(__dirname, "dist", "index.js"),
      format: "es"
    },
    plugins: [
      babel({
        exclude: "**/node_modules/**",
        runtimeHelpers: true
      }),
      commonjs(),
      resolve()
    ],
    external: ["react", "antd", "prop-types", "moment", "dva"]
  }
];
