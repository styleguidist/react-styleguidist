"use strict";

exports.__esModule = true;
exports.default = mergeWebpackConfig;

var _webpackMerge = _interopRequireDefault(require("webpack-merge"));

var _isFunction = _interopRequireDefault(require("lodash/isFunction"));

var _omit = _interopRequireDefault(require("lodash/omit"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const IGNORE_SECTIONS = ['entry', 'externals', 'output', 'watch', 'stats', 'styleguidist'];
const IGNORE_SECTIONS_ENV = {
  development: [],
  // For production builds, we'll ignore devtool settings to avoid
  // source mapping bloat.
  production: ['devtool']
};
const IGNORE_PLUGINS = ['CommonsChunkPlugins', 'MiniHtmlWebpackPlugin', 'HtmlWebpackPlugin', 'OccurrenceOrderPlugin', 'DedupePlugin', 'UglifyJsPlugin', 'TerserPlugin', 'HotModuleReplacementPlugin'];
const merge = (0, _webpackMerge.default)({
  // Ignore user’s plugins to avoid duplicates and issues with our plugins
  customizeArray: _webpackMerge.default.unique('plugins', IGNORE_PLUGINS, plugin => plugin.constructor && plugin.constructor.name)
});

/**
 * Merge two Webpack configs.
 *
 * In the user config:
 * - Ignores given sections (options.ignore).
 * - Ignores plugins that shouldn’t be used twice or may cause issues.
 *
 * @param {object} baseConfig
 * @param {object|Function} userConfig
 * @param {string} env
 * @return {object}
 */
function mergeWebpackConfig(baseConfig, userConfig, env = 'production') {
  const userConfigObject = (0, _isFunction.default)(userConfig) ? userConfig(env) : userConfig;
  const safeUserConfig = (0, _omit.default)(userConfigObject, IGNORE_SECTIONS.concat(IGNORE_SECTIONS_ENV[env]));
  return merge(baseConfig, safeUserConfig);
}