const path = require('path');

const PATHS = {
  src: path.resolve(__dirname, '../src'),
  dist: path.resolve(__dirname, '../dist'),
  example: path.resolve(__dirname, '../example'),
};

module.exports = {
  externals: {
    paths: PATHS,
  },

  context: PATHS.src,

  output: {
    path: PATHS.dist,
    filename: 'index.js',
  },

  resolve: {
    extensions: ['.js', '.ts'],
  },
};
