var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-maps',
  entry: [
    path.join(__dirname, 'src/index.js'),
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/dev-server',
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  progress: true,
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json-loader'},
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', },
    ]
  },
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js']
  }
};
