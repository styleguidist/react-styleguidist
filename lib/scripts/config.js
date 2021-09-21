"use strict";

exports.__esModule = true;
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _findup = _interopRequireDefault(require("findup"));

var _isString = _interopRequireDefault(require("lodash/isString"));

var _isPlainObject = _interopRequireDefault(require("lodash/isPlainObject"));

var _config = _interopRequireDefault(require("./schemas/config"));

var _error = _interopRequireDefault(require("./utils/error"));

var _sanitizeConfig = _interopRequireDefault(require("./utils/sanitizeConfig"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CONFIG_FILENAME = 'styleguide.config.js';
/**
 * Try to find config file up the file tree.
 *
 * @return {string|boolean} Config absolute file path.
 */

function findConfigFile() {
  let configDir;

  try {
    configDir = _findup.default.sync(process.cwd(), CONFIG_FILENAME);
  } catch (exception) {
    return false;
  }

  return _path.default.join(configDir, CONFIG_FILENAME);
}
/**
 * Read, parse and validate config file or passed config.
 *
 * @param {object|string} [config] All config options or config file name or nothing.
 * @param {function} [update] Change config object before running validation on it.
 * @returns {object}
 */


function getConfig(config, update) {
  let configFilepath = false;

  if ((0, _isString.default)(config)) {
    // Load config from a given file
    configFilepath = _path.default.resolve(process.cwd(), config);

    if (!_fs.default.existsSync(configFilepath)) {
      throw new _error.default('Styleguidist config not found: ' + configFilepath + '.');
    }

    config = {};
  } else if (!(0, _isPlainObject.default)(config)) {
    // Try to read config options from a file
    configFilepath = findConfigFile();
    config = {};
  }

  if (configFilepath) {
    config = require(configFilepath);
  }

  if (!config || (0, _isString.default)(config)) {
    return {};
  }

  if (update) {
    config = update(config);
  }

  const configDir = configFilepath ? _path.default.dirname(configFilepath) : process.cwd();

  try {
    return (0, _sanitizeConfig.default)(config, _config.default, configDir);
  } catch (exception) {
    if (exception instanceof _error.default) {
      throw new _error.default(`Something is wrong with your style guide config\n\n${exception.message}`, exception.extra);
    } else {
      throw exception;
    }
  }
}

var _default = getConfig;
exports.default = _default;