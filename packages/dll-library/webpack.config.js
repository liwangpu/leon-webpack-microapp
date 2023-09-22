const path = require('path');
const webpack = require('webpack');
const { generateProjectInfo, generateDLLInfo } = require('../../tool');

const project = generateProjectInfo();
const dll = generateDLLInfo();
const distDir = project.getDistDir();

module.exports = (env) => {
  return {
    // watch: true,
    mode: 'development',
    devtool: false,
    entry: './src/main.ts',
    output: {
      path: distDir,
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
        },
      ],
    },
    plugins: [
      dll.useDLLOutputPlugin(),
    ],
    devServer: {
      devMiddleware: {
        writeToDisk: true,
      },
      client: false,
      hot: false,
      historyApiFallback: true,
      port: 7102,
    },
  };
};