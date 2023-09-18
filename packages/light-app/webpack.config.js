const path = require('path');
const webpack = require("webpack");
const { ModuleFederationPlugin } = webpack.container;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const WRITE_TO_DISK = true;

const distDir = path.resolve(__dirname, '../../dist/packages/light-app');

module.exports = (env) => {
  return {
    mode: 'development',
    devtool: false,
    cache: true,
    entry: {
      index: './src/main.ts',
    },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    },
    output: {
      path: path.resolve(distDir),
      clean: true,
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          // options: {
          //   cacheCompression: false,
          //   cacheDirectory: true,
          // },
        },
      ],
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'app',
        // filename: 'remoteEntry.js',
        remotes: {
          "secondary-library": "SecondaryLibrary@//localhost:7102/remoteEntry.js",
          // "primary-component-package/componentPackage": "tiangongPrimaryComponentPackage@//localhost:9001/remoteEntry.js",
          // "primary-component-package/button": "tiangongPrimaryComponentPackage@//127.0.0.1:5501/remoteEntry.js"
        },
        // shared: { 'lodash': { singleton: true } },
      }),
      new HtmlWebpackPlugin({
        title: 'LIGHT测试',
        template: './public/index.html',
        publicPath: '/',
        filename: path.resolve(distDir, 'index.html'),
      }),
      new CopyPlugin({
        patterns: [
          { from: "public/assets", to: path.resolve(distDir, 'assets') },
        ]
      }),
      new CleanWebpackPlugin(),
    ],
    devServer: {
      static: distDir,
      devMiddleware: {
        writeToDisk: WRITE_TO_DISK,
      },
      historyApiFallback: true,
      hot: false,
      port: 7201,
    },
  };
};