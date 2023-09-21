const path = require('path');
const webpack = require("webpack");
const { ModuleFederationPlugin } = webpack.container;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const { generateProjectInfo, generateDLLInfo } = require('../../tool');

const project = generateProjectInfo();
const dll = generateDLLInfo();
const distDir = project.getDistDir();
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
      new webpack.DllReferencePlugin({
        context: dll.getDLLDir(),
        manifest: require(dll.getManifest()),
      }),
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
          { from: "public/assets", to: assetDir },
          { from: dll.getDLLJsDir(), to: path.resolve(assetDir, 'js') },
        ]
      }),
      new CleanWebpackPlugin(),
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