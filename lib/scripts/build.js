"use strict";

exports.__esModule = true;
exports.default = build;

var _webpack = _interopRequireDefault(require("webpack"));

var _makeWebpackConfig = _interopRequireDefault(require("./make-webpack-config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function build(config, callback) {
  return (0, _webpack.default)((0, _makeWebpackConfig.default)(config, 'production'), (err, stats) => {
    // require('fs').writeFileSync('stats.json', JSON.stringify(stats.toJson()));
    callback(err, stats);
  });
}