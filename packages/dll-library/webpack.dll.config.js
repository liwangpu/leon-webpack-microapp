const path = require('path');
const webpack = require("webpack");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { generateDLLInfo, generateProjectInfo } = require('../../tool');

const project = generateProjectInfo();
const dll = generateDLLInfo();
const distDir = project.getDistDir();

module.exports = () => {
  return {
    mode: 'development',
    devtool: false,
    cache: true,
    entry: {
      vendor: [
        'eoncc-is-odd',
        // 'lodash-es',
      ],
    },
    output: {
      // path: dll.getDLLJsDir(), // 打包后文件输出的位置
      path: distDir, // 打包后文件输出的位置
      filename: '[name].dll.js',
      library: '[name]_library'
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
      rules: [

      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      dll.useDLLBuilderPlugin(),
    ],
  };
};