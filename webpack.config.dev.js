const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV,
  devtool: "eval-source-map",
  entry: "./src/dev.js",
  plugins: [
    new HTMLWebpackPlugin({
      template: "src/index.html"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      TEST_SCRIPT: JSON.stringify(process.argv[2])
    })
  ],
  output: {
    filename: `[name].bundle.js`,
  },
  module: {
    rules: [
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
  }
};
