"use strict";

exports.__esModule = true;
exports.default = _default;

var _path = _interopRequireDefault(require("path"));

var _isArray = _interopRequireDefault(require("lodash/isArray"));

var _reactDocgen = require("react-docgen");

var _escodegen = require("escodegen");

var _toAst = _interopRequireDefault(require("to-ast"));

var _glogg = _interopRequireDefault(require("glogg"));

var _getExamples = _interopRequireDefault(require("./utils/getExamples"));

var _getProps = _interopRequireDefault(require("./utils/getProps"));

var _sortProps = _interopRequireDefault(require("./utils/sortProps"));

var consts = _interopRequireWildcard(require("../scripts/consts"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const logger = (0, _glogg.default)('rsg');
const ERROR_MISSING_DEFINITION = 'No suitable component definition found.';

function _default(source) {
  const file = this.request.split('!').pop() || '';
  const config = this._styleguidist; // Setup Webpack context dependencies to enable hot reload when adding new files or updating any of component dependencies

  if (config.contextDependencies) {
    config.contextDependencies.forEach(dir => this.addContextDependency(dir));
  }

  const defaultParser = (filePath, code, resolver, handlers) => (0, _reactDocgen.parse)(code, resolver, handlers, {
    filename: filePath
  });

  const propsParser = config.propsParser || defaultParser;
  let docs = {};

  try {
    docs = propsParser(file, source, config.resolver, config.handlers(file)); // Support only one component

    if ((0, _isArray.default)(docs)) {
      if (docs.length === 0) {
        throw new Error(ERROR_MISSING_DEFINITION);
      }

      docs = docs[0];
    }
  } catch (err) {
    const errorMessage = err.toString();

    const componentPath = _path.default.relative(process.cwd(), file);

    const message = errorMessage === `Error: ${ERROR_MISSING_DEFINITION}` ? `${componentPath} matches a pattern defined in “components” or “sections” options in your ` + 'style guide config but doesn’t export a component.\n\n' + 'It usually happens when using third-party libraries, see possible solutions here:\n' + `${consts.DOCS_THIRDPARTIES}` : `Cannot parse ${componentPath}: ${err}\n\n` + 'It usually means that react-docgen does not understand your source code, try to file an issue here:\n' + 'https://github.com/reactjs/react-docgen/issues';
    logger.warn(message);
  }

  const tempDocs = (0, _getProps.default)(docs, file);
  let finalDocs = { ...tempDocs,
    props: []
  };
  const componentProps = tempDocs.props;

  if (componentProps) {
    // Transform the properties to an array. This will allow sorting
    // TODO: Extract to a module
    const propsAsArray = Object.keys(componentProps).reduce((acc, name) => {
      componentProps[name].name = name;
      acc.push(componentProps[name]);
      return acc;
    }, []);
    const sortProps = config.sortProps || _sortProps.default;
    finalDocs.props = sortProps(propsAsArray);
  } // Examples from Markdown file


  const examplesFile = config.getExampleFilename(file);
  finalDocs.examples = (0, _getExamples.default)(file, finalDocs.displayName, examplesFile, config.defaultExample);

  if (config.updateDocs) {
    finalDocs = config.updateDocs(finalDocs, file);
  }

  return `
if (module.hot) {
	module.hot.accept([])
}

module.exports = ${(0, _escodegen.generate)((0, _toAst.default)(finalDocs))}
	`;
}