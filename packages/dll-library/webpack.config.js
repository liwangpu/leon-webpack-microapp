const path = require('path');
const webpack = require("webpack");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { generateDLLInfo } = require('../../tool');

const dll = generateDLLInfo();

module.exports = () => {
  return {
    mode: 'development',
    devtool: false,
    cache: true,
    entry: {
      vendor: [
        'eoncc-is-odd'
      ],
    },
    output: {
      path: dll.getDLLJsDir(), // 打包后文件输出的位置
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
      new webpack.DllPlugin({
        path: path.join(dll.getDLLDir(), '[name]-manifest.json'),
        name: '[name]_library',
        context: dll.getDLLDir()
      }),
    ],
  };
};