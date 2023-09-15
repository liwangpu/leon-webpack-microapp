const path = require('path');
const webpack = require("webpack");
const { ModuleFederationPlugin } = webpack.container;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// const { dependencies } = require("./package.json");

const WRITE_TO_DISK = true;

module.exports = (env) => {
  return {
    mode: 'development',
    devtool: false,
    // cache: false,
    // target: 'web',
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
      // publicPath: '/',
      path: path.resolve(__dirname, '../../dist/light-app'),
      clean: false,

      // filename: '[name].bundle.js',
      // path: path.resolve(__dirname, 'dist'),
      // clean: true,
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
      // new MiniCssExtractPlugin({
      //   experimentalUseImportModule: false,
      // }),
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
        template: './public/index.html'
      }),
      new CleanWebpackPlugin(),
    ],
    devServer: {
      static: './dist',
      devMiddleware: {
        writeToDisk: WRITE_TO_DISK,
      },
      historyApiFallback: true,
      hot: false,
      port: 7201,
    },
  };
};