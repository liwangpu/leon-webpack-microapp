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
      path: path.resolve(__dirname, '../../dist/secondary-library'),
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
      new ModuleFederationPlugin({
        name: 'secondary-library',
        filename: 'remoteEntry.js',
        library: { type: 'var', name: 'SecondaryLibrary' },
        exposes: {
          './': './lib/index.ts',
        },
        // shared: {
        //   'react': { singleton: true },
        //   'react-dom': { singleton: true },
        //   'react-router-dom': { singleton: true },
        //   'mobx-react-lite': { singleton: true },
        //   'mobx-state-tree': { singleton: true },
        //   'mobx': { singleton: true },
        //   '@faker-js/faker': { singleton: true },
        // },
      }),
      new CleanWebpackPlugin()
    ],
    devServer: {
      static: {
        directory: path.resolve(__dirname, '../../dist/secondary-library'),
        // serveIndex: true,
      },
      // static: './',
      devMiddleware: {
        writeToDisk: true,
      },
      // hot: true,
      historyApiFallback: true,
      port: 7102,
    },
  };
};