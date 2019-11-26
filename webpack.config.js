const path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  // 入口文件
  entry: "./lib/utils.js",
  // 输出文件
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  externals: {
    react: "react"
    // lodash: {
    //   commonjs2: "lodash"
    // }
  },
  module: {
    rules: [
      {
        include: [path.resolve(__dirname, "lib")],
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { modules: false }]
              // "@babel/preset-react"
            ],
            plugins: ["@babel/plugin-transform-runtime"]
          }
        }
      }
    ]
  },
  // plugins: [
  //   new BundleAnalyzerPlugin({
  //     analyzerMode: "server",
  //     analyzerHost: "127.0.0.1",
  //     analyzerPort: 8889,
  //     reportFilename: "report.html",
  //     defaultSizes: "parsed",
  //     openAnalyzer: false,
  //     generateStatsFile: false,
  //     statsFilename: "stats.json",
  //     statsOptions: null,
  //     logLevel: "info"
  //   })
  // ],
  resolve: {
    extensions: [".js"]
  }
};
