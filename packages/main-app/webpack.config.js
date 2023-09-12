const path = require('path');
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { dependencies } = require("./package.json");
console.log(`dependencies:`,dependencies);
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
      publicPath: '/',
      path: path.resolve(__dirname, '../../dist/main-app'),
      clean: true,
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
      new HtmlWebpackPlugin({
        title: '应用',
        template: './public/index.html'
      }),
      WRITE_TO_DISK ? new CleanWebpackPlugin() : false,
      new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      devMiddleware: {
        writeToDisk: WRITE_TO_DISK,
      },
      // contentBase: "/src/",
      // inline: true,
      // stats: "errors-only",
      historyApiFallback: true,
      hot: true,
      port: 7101,
    },
  };
};