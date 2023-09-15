const path = require('path');
const webpack = require('webpack');
const { ModuleFederationPlugin } = webpack.container;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env) => {
  return {
    mode: 'development',
    devtool: false,
    entry: './lib/index.ts',
    output: {
      path: path.resolve(__dirname, '../../dist/secondary-library'),
      // filename: '[name].bundle.js',
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
      // new ModuleFederationPlugin({
      //   name: 'secondary-library',
      //   filename: 'remoteEntry.js',
      //   library: { type: 'var', name: 'SecondaryLibrary' },
      //   exposes: {
      //     './': './lib/index.ts',
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
      static: {
        directory: path.resolve(__dirname, '../../dist/secondary-library'),
        // serveIndex: true,
      },
      // static: './',
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