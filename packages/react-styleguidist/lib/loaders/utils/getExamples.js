

const _path = _interopRequireDefault(require("path"));

const _querystringify = _interopRequireDefault(require("querystringify"));

const _requireIt = _interopRequireDefault(require("./requireIt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const examplesLoader = _path.default.resolve(__dirname, '../examples-loader.js');
/**
 * Get require statement for examples file if it exists, or for default examples if it was defined.
 */


module.exports = function getExamples(file, displayName, examplesFile, defaultExample) {
  const examplesFileToLoad = examplesFile || defaultExample;

  if (!examplesFileToLoad) {
    return null;
  }

  const relativePath = `./${_path.default.relative(_path.default.dirname(examplesFileToLoad), file)}`;
  const query = {
    displayName,
    file: relativePath,
    shouldShowDefaultExample: !examplesFile && !!defaultExample
  };
  return (0, _requireIt.default)(`!!${examplesLoader}?${_querystringify.default.stringify(query)}!${examplesFileToLoad}`);
};