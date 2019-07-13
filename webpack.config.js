const path = require("path");
const nodeExternals = require("webpack-node-externals");
const Dotenv = require("dotenv-webpack");
const GasPlugin = require("gas-webpack-plugin");
const es3ifyPlugin = require("es3ify-webpack-plugin");

const clientSideConfig = {
  // 原因不明：このmodeとdevtoolでないとGasPluginによる補完が効かなくなる
  mode: "development",
  devtool: "inline-source-map",

  entry: ["@babel/polyfill", "./src/client.ts"],
  resolve: {
    extensions: [".ts", ".js"]
  },
  output: {
    path: path.resolve(__dirname, "dist/client")
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader"
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env"]]
          }
        }
      }
    ]
  },
  plugins: [new GasPlugin(), new es3ifyPlugin(), new Dotenv()]
};

const serverSideConfig = {
  mode: "production",
  entry: ["./src/server.ts"],
  target: "node",
  externals: [nodeExternals()],
  resolve: {
    extensions: [".ts", ".js"]
  },
  output: {
    path: path.resolve(__dirname, "dist/server")
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader"
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: "graphql-tag/loader"
      }
    ]
  },
  plugins: [new Dotenv()]
};

module.exports.clientSideConfig = clientSideConfig;
module.exports.serverSideConfig = serverSideConfig;

module.exports = [clientSideConfig, serverSideConfig];
