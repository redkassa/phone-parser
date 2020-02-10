const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./webpack.config.common');

const { paths } = commonConfig.externals;

module.exports = webpackMerge(commonConfig, {
  mode: 'development',

  devtool: 'eval-source-map',

  entry: `${paths.example}/index.ts`,

  plugins: [
    new HtmlWebpackPlugin({
      template: `${paths.example}/assets/index.html`,
    }),
  ],

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },

  devServer: {
    contentBase: paths.dist,
    port: 8080,
  },
});
