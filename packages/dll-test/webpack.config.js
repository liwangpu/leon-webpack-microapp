const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const distDir = path.resolve(__dirname, 'dist');
const assetDir = path.resolve(distDir, 'assets');
const WRITE_TO_DISK = true;

module.exports = (env) => {
  return {
    mode: 'development',
    devtool: false,
    // cache: true,
    entry: {
      index: './src/main.ts',
    },
    output: {
      path: path.resolve(distDir),
      clean: false,
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
      new HtmlWebpackPlugin({
        title: 'DLL测试',
        template: './public/index.html',
        publicPath: '/',
        filename: path.resolve(distDir, 'index.html'),
      }),
      new CopyPlugin({
        patterns: [
          { from: "public/assets", to: assetDir },
          { from: path.resolve(distDir, 'vendor.dll.js'), to: path.resolve(assetDir, 'js') },
          { from: path.resolve(distDir, 'manifest.json'), to: path.resolve(assetDir, 'js') },
        ]
      }),
      new webpack.DllReferencePlugin({
        context: distDir,
        // context: this.getDLLJsDir(),
        manifest: require(path.resolve(distDir, './manifest.json')),
      })
      // new CleanWebpackPlugin(),
    ],
    devServer: {
      static: {
        directory: assetDir,
        publicPath: '/assets'
      },
      devMiddleware: {
        writeToDisk: WRITE_TO_DISK,
      },
      historyApiFallback: true,
      hot: false,
      port: 7201,
    },
  };
};