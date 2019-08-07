const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV,
  entry: "./src/index.js",
  plugins: [new CleanWebpackPlugin([`build/react-image-designer.js`])],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: `react-image-designer.js`,
    libraryTarget: "commonjs2"
  },
  module: {
    rules: [
      {
        test: /\.(m?jsx?)$/,
        exclude: /(node_modules|bower_components|build|umd)/,
        enforce: "pre",
        use: require.resolve("eslint-loader")
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: "babel-loader",
          options: {
            configFile: "./babel.config.js"
          }
        }
      }
    ]
  },
  externals: [
    {
      "react": {
        root: "React",
        commonjs2: "react",
        commonjs: "react",
        amd: "react"
      },
      "react-dom": {
        root: "ReactDom",
        commonjs2: "react-dom",
        commonjs: "react-dom",
        amd: "react-dom"
      }
    }
  ]
};
