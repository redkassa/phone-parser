const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  src: path.resolve(__dirname, '../src'),
  dist: path.resolve(__dirname, '../dist'),
  example: path.resolve(__dirname, '../example'),
};

module.exports = {
  mode: 'development',

  devtool: 'eval-source-map',

  context: PATHS.src,

  entry: `${PATHS.example}/index.ts`,

  output: {
    path: PATHS.dist,
    filename: 'index.js',
  },

  resolve: {
    extensions: ['.js', '.ts'],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: `${PATHS.example}/assets/index.html`,
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
    contentBase: PATHS.dist,
    port: 8080,
  },
};
