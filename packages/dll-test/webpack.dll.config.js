const path = require('path');
const webpack = require("webpack");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const distDir = path.resolve(__dirname, 'dist');

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
      path: distDir,
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
      // new CleanWebpackPlugin(),
      new webpack.DllPlugin({
        context: distDir,
        name: '[name]_[fullhash]',
        path: path.join(distDir, 'manifest.json'),
      })
    ],
  };
};