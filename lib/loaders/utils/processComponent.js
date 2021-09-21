"use strict";

exports.__esModule = true;
exports.default = processComponent;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _getNameFromFilePath = _interopRequireDefault(require("./getNameFromFilePath"));

var _requireIt = _interopRequireDefault(require("./requireIt"));

var _slugger = _interopRequireDefault(require("./slugger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const propsLoader = _path.default.resolve(__dirname, '../props-loader.js');
/**
 * References the filepath of the metadata file.
 *
 * @param {string} filepath
 * @returns {string}
 */


function getComponentMetadataPath(filepath) {
  const extname = _path.default.extname(filepath);

  return filepath.substring(0, filepath.length - extname.length) + '.json';
}
/**
 * Return an object with all required for style guide information for a given component.
 *
 * @param {string} filepath
 * @param {object} config
 * @returns {object}
 */


function processComponent(filepath, config) {
  const componentPath = _path.default.relative(config.configDir, filepath);

  const componentName = (0, _getNameFromFilePath.default)(filepath);
  const examplesFile = config.getExampleFilename(filepath);
  const componentMetadataPath = getComponentMetadataPath(filepath);
  return {
    filepath: componentPath,
    slug: _slugger.default.slug(componentName),
    pathLine: config.getComponentPathLine(componentPath),
    module: (0, _requireIt.default)(filepath),
    props: (0, _requireIt.default)(`!!${propsLoader}!${filepath}`),
    hasExamples: !!(examplesFile && _fs.default.existsSync(examplesFile)),
    metadata: _fs.default.existsSync(componentMetadataPath) ? (0, _requireIt.default)(componentMetadataPath) : {}
  };
}