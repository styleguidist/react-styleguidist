"use strict";

exports.__esModule = true;
exports.default = sanitizeConfig;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var isDirectory = _interopRequireWildcard(require("is-directory"));

var _castArray = _interopRequireDefault(require("lodash/castArray"));

var _isBoolean = _interopRequireDefault(require("lodash/isBoolean"));

var _isFunction = _interopRequireDefault(require("lodash/isFunction"));

var _isPlainObject = _interopRequireDefault(require("lodash/isPlainObject"));

var _isString = _interopRequireDefault(require("lodash/isString"));

var _isFinite = _interopRequireDefault(require("lodash/isFinite"));

var _map = _interopRequireDefault(require("lodash/map"));

var _listify = _interopRequireDefault(require("listify"));

var _kleur = _interopRequireDefault(require("kleur"));

var _fastestLevenshtein = require("fastest-levenshtein");

var _typeDetect = _interopRequireDefault(require("type-detect"));

var _glogg = _interopRequireDefault(require("glogg"));

var _qI = require("q-i");

var _error = _interopRequireDefault(require("./error"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const logger = (0, _glogg.default)('rsg');
const typeCheckers = {
  number: _isFinite.default,
  string: _isString.default,
  boolean: _isBoolean.default,
  array: Array.isArray,
  function: _isFunction.default,
  object: _isPlainObject.default,
  'file path': _isString.default,
  'existing file path': _isString.default,
  'directory path': _isString.default,
  'existing directory path': _isString.default
};

const typesList = types => (0, _listify.default)(types, {
  finalWord: 'or'
});

const shouldBeFile = types => types.some(type => type.includes('file'));

const shouldBeDirectory = types => types.some(type => type.includes('directory'));

const shouldExist = types => types.some(type => type.includes('existing'));
/**
 * Validates and normalizes config.
 *
 * @param {object} config
 * @param {object} schema
 * @param {string} rootDir
 * @return {object}
 */


function sanitizeConfig(config, schema, rootDir) {
  // Check for unknown fields
  (0, _map.default)(config, (value, keyAny) => {
    const key = keyAny;

    if (!schema[key]) {
      // Try to guess
      const possibleOptions = Object.keys(schema);
      const suggestedOption = possibleOptions.reduce((suggestion, option) => {
        const steps = (0, _fastestLevenshtein.distance)(option, key);

        if (steps < 2) {
          return option;
        }

        return suggestion;
      }, '');
      throw new _error.default(`Unknown config option ${_kleur.default.bold(key)} was found, the value is:\n` + (0, _qI.stringify)(value) + (suggestedOption ? `\n\nDid you mean ${_kleur.default.bold(suggestedOption)}?` : ''), suggestedOption);
    }
  }); // Check all fields

  const safeConfig = {};
  (0, _map.default)(schema, (props, keyAny) => {
    const key = keyAny;
    let value = config[key]; // Custom processing

    if (props.process) {
      value = props.process(value, config, rootDir);
    }

    if (value === undefined) {
      // Default value
      value = props.default; // Check if the field is required

      const isRequired = (0, _isFunction.default)(props.required) ? props.required(config) : props.required;

      if (isRequired) {
        const message = (0, _isString.default)(isRequired) ? isRequired : `${_kleur.default.bold(key)} config option is required.`;
        throw new _error.default(message, key);
      }
    } else if (props.deprecated) {
      logger.warn(`${key} config option is deprecated. ${props.deprecated}`);
    } else if (props.removed) {
      throw new _error.default(`${_kleur.default.bold(key)} config option was removed. ${props.removed}`);
    }

    if (value !== undefined && props.type) {
      const types = (0, _castArray.default)(props.type); // Check type

      const hasRightType = types.some(type => {
        if (!typeCheckers[type]) {
          throw new _error.default(`Wrong type ${_kleur.default.bold(type)} specified for ${_kleur.default.bold(key)} in schema.`);
        }

        return typeCheckers[type](value);
      });

      if (!hasRightType) {
        const exampleValue = props.example || props.default;
        const example = {};

        if (exampleValue) {
          example[key] = exampleValue;
        }

        const exampleText = exampleValue ? `
Example:

${(0, _qI.stringify)(example)}` : '';
        throw new _error.default(`${_kleur.default.bold(key)} config option should be ${typesList(types)}, received ${(0, _typeDetect.default)(value)}.\n${exampleText}`, key);
      } // Absolutize paths


      if ((0, _isString.default)(value) && (shouldBeFile(types) || shouldBeDirectory(types))) {
        value = _path.default.resolve(rootDir, value); // Check for existence

        if (shouldExist(types)) {
          if (shouldBeFile(types) && !_fs.default.existsSync(value)) {
            throw new _error.default(`A file specified in ${_kleur.default.bold(key)} config option does not exist:\n${value}`, key);
          }

          if (shouldBeDirectory(types) && !isDirectory.sync(value)) {
            throw new _error.default(`A directory specified in ${_kleur.default.bold(key)} config option does not exist:\n${value}`, key);
          }
        }
      }
    }

    safeConfig[keyAny] = value;
  });
  return safeConfig;
}