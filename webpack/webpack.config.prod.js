const webpackMerge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const commonConfig = require('./webpack.config.common');

const { paths } = commonConfig.externals;

module.exports = webpackMerge(commonConfig, {
  mode: 'production',

  devtool: 'source-map',

  entry: './index.ts',

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/, paths.example],
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
    ],
  },

  plugins: [new CleanWebpackPlugin()],
});
