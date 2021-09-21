"use strict";

exports.__esModule = true;
exports.default = getExamples;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _qss = require("qss");

var _requireIt = _interopRequireDefault(require("./requireIt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const examplesLoader = _path.default.resolve(__dirname, '../examples-loader.js');
/**
 * Get require statement for examples file if it exists, or for default examples if it was defined.
 */


function getExamples(file, displayName, examplesFile, defaultExample) {
  const examplesFileToLoad = (examplesFile && _fs.default.existsSync(examplesFile) ? examplesFile : false) || defaultExample;

  if (!examplesFileToLoad) {
    return null;
  }

  const relativePath = `./${_path.default.relative(_path.default.dirname(examplesFileToLoad), file)}`;
  const query = {
    displayName,
    file: relativePath,
    shouldShowDefaultExample: !examplesFile && !!defaultExample
  };
  return (0, _requireIt.default)(`!!${examplesLoader}?${(0, _qss.encode)(query)}!${examplesFileToLoad}`);
}