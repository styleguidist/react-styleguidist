"use strict";

exports.__esModule = true;
exports.default = _default;

require("./utils/ensureWebpack");

var _makeWebpackConfig = _interopRequireDefault(require("./make-webpack-config"));

var _build = _interopRequireDefault(require("./build"));

var _server = _interopRequireDefault(require("./server"));

var _config = _interopRequireDefault(require("./config"));

var _logger = _interopRequireDefault(require("./logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Make sure user has webpack installed

/**
 * Initialize Styleguide API.
 *
 * @param {object} [config] Styleguidist config.
 * @returns {object} API.
 */
function _default(configArg) {
  const config = (0, _config.default)(configArg, conf => {
    (0, _logger.default)(conf.logger, conf.verbose, {});
    return conf;
  });
  return {
    /**
     * Build style guide.
     *
     * @param {Function} callback callback(err, config, stats).
     * @return {Compiler} Webpack Compiler instance.
     */
    build(callback) {
      return (0, _build.default)(config, (err, stats) => callback(err, config, stats));
    },

    /**
     * Start style guide dev server.
     *
     * @param {Function} callback callback(err, config).
     * @return {ServerInfo.App} Webpack-Dev-Server.
     * @return {ServerInfo.Compiler} Webpack Compiler instance.
     */
    server(callback) {
      return (0, _server.default)(config, err => callback(err, config));
    },

    /**
     * Return Styleguidist Webpack config.
     *
     * @param {string} [env=production] 'production' or 'development'.
     * @return {object}
     */
    makeWebpackConfig(env) {
      return (0, _makeWebpackConfig.default)(config, env || 'production');
    }

  };
}