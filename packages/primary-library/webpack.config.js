const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = (env) => {
  return {
    mode: 'development',
    devtool: false,
    entry: './lib/index.ts',
    output: {
      publicPath: 'auto',
      path: path.resolve(__dirname, '../../dist/primary-library'),
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.less$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                sourceMap: false,
              }
            },
            { loader: "less-loader", options: { sourceMap: false } },
          ]
        },
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin(),
      // new ModuleFederationPlugin({
      //   name: 'primary-lib',
      //   filename: 'remoteEntry.js',
      //   library: { type: 'var', name: 'PrimaryLib' },
      //   exposes: {
      //     './': './lib/index.ts',
      //   },
      //   shared: {
      //     'react': { singleton: true },
      //     'react-dom': { singleton: true },
      //     'react-router-dom': { singleton: true },
      //     'mobx-react-lite': { singleton: true },
      //     'mobx-state-tree': { singleton: true },
      //     'mobx': { singleton: true },
      //     '@faker-js/faker': { singleton: true },
      //   },
      // }),
      new CleanWebpackPlugin()
    ],
    devServer: {
      devMiddleware: {
        writeToDisk: true,
      },
      hot: true,
      port: 7102,
    },
  };
};