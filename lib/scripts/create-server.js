"use strict";

exports.__esModule = true;
exports.default = createServer;

var _webpack = _interopRequireDefault(require("webpack"));

var _webpackDevServer = _interopRequireDefault(require("webpack-dev-server"));

var _webpackMerge = _interopRequireDefault(require("webpack-merge"));

var _makeWebpackConfig = _interopRequireDefault(require("./make-webpack-config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createServer(config, env) {
  const webpackConfig = (0, _makeWebpackConfig.default)(config, env);
  const webpackDevServerConfig = (0, _webpackMerge.default)({
    noInfo: true,
    compress: true,
    clientLogLevel: 'none',
    hot: true,
    quiet: true,
    watchOptions: {
      ignored: /node_modules/
    },
    watchContentBase: config.assetsDir !== undefined,
    stats: webpackConfig.stats || {}
  }, webpackConfig.devServer, {
    contentBase: config.assetsDir
  });
  const compiler = (0, _webpack.default)(webpackConfig);
  const devServer = new _webpackDevServer.default(compiler, webpackDevServerConfig); // User defined customizations

  if (config.configureServer) {
    config.configureServer(devServer.app, env);
  }

  return {
    app: devServer,
    compiler
  };
}