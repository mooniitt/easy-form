import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
const path = require("path");

export default [
  // browser-friendly UMD build
  {
    input: "src/es6.js",
    output: {
      file: path.resolve(__dirname, "dist", "file.es6.js"),
      format: "es"
    },
    plugins: [
      babel({
        include: path.resolve(__dirname, "src", "es6.js"),
        exclude: "**/node_modules/**",
        runtimeHelpers: true
      }),
      commonjs(),
      resolve()
    ],
    external: ["react", "antd", "prop-types", "moment", "dva"]
  }
];
