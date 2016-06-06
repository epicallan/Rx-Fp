var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config');

var compiler = webpack(webpackConfig);
var port = 3000;
var serverOptions = {
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true
  }
};

new WebpackDevServer(compiler, serverOptions)
  .listen(port, 'localhost', function (err) {
    if (err) console.log(err);
    console.info('==> 🚧  Webpack development server listening on port %s', port);
  });
