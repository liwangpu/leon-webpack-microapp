const path = require('path');
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { dependencies } = require("./package.json");

const WRITE_TO_DISK = true;

module.exports = (env) => {
  return {
    mode: 'development',
    devtool: false,
    cache: true,
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
    entry: {
      index: './src/main.tsx',
    },
    output: {
      path: path.resolve(__dirname, '../../dist/packages/main-app'),
      clean: false,
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
      new MiniCssExtractPlugin({
        experimentalUseImportModule: false,
      }),
      new HtmlWebpackPlugin({
        title: '应用',
        template: './public/index.html'
      }),
      new CleanWebpackPlugin(),
      // new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
      // static: {
      //   directory: path.join(__dirname, 'public'),
      // },
      devMiddleware: {
        writeToDisk: WRITE_TO_DISK,
      },
      historyApiFallback: true,
      liveReload: false,
      hot: true,
      port: 7101,
    },
  };
};