const path = require('path');
const webpack = require('webpack');
const { ModuleFederationPlugin } = webpack.container;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { getProjectOutputDir } = require('../../tool');

module.exports = (env) => {
  return {
    // watch: true,
    mode: 'development',
    devtool: false,
    entry: './lib/index.ts',
    output: {
      path: getProjectOutputDir(),
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
    externals: {
      "eoncc-is-odd": 'eonccIsOdd',
    },
    plugins: [
      // new ModuleFederationPlugin({
      //   name: 'tertiary-library',
      //   filename: 'remoteEntry.js',
      //   library: { type: 'var', name: 'TertiaryLibrary' },
      //   exposes: {
      //     // './': './lib/index.ts',
      //     './Util': './lib/util.ts',
      //   },
      //   // shared: {
      //   //   'react': { singleton: true },
      //   //   'react-dom': { singleton: true },
      //   //   'react-router-dom': { singleton: true },
      //   //   'mobx-react-lite': { singleton: true },
      //   //   'mobx-state-tree': { singleton: true },
      //   //   'mobx': { singleton: true },
      //   //   '@faker-js/faker': { singleton: true },
      //   // },
      // }),
      new CleanWebpackPlugin(),
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