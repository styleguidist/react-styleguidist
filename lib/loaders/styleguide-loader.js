"use strict";

exports.__esModule = true;
exports.default = _default;
exports.pitch = pitch;

var _pick = _interopRequireDefault(require("lodash/pick"));

var _flatten = _interopRequireDefault(require("lodash/flatten"));

var _astTypes = require("ast-types");

var _commonDir = _interopRequireDefault(require("common-dir"));

var _escodegen = require("escodegen");

var _toAst = _interopRequireDefault(require("to-ast"));

var _glogg = _interopRequireDefault(require("glogg"));

var fileExistsCaseInsensitive = _interopRequireWildcard(require("../scripts/utils/findFileCaseInsensitive"));

var _getAllContentPages = _interopRequireDefault(require("./utils/getAllContentPages"));

var _getComponentFilesFromSections = _interopRequireDefault(require("./utils/getComponentFilesFromSections"));

var _getComponentPatternsFromSections = _interopRequireDefault(require("./utils/getComponentPatternsFromSections"));

var _getSections = _interopRequireDefault(require("./utils/getSections"));

var _filterComponentsWithExample = _interopRequireDefault(require("./utils/filterComponentsWithExample"));

var _slugger = _interopRequireDefault(require("./utils/slugger"));

var _resolveESModule = _interopRequireDefault(require("./utils/resolveESModule"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const logger = (0, _glogg.default)('rsg'); // Config options that should be passed to the client

const CLIENT_CONFIG_OPTIONS = ['compilerConfig', 'tocMode', 'mountPointId', 'pagePerSection', 'previewDelay', 'ribbon', 'showSidebar', 'styles', 'theme', 'title', 'version'];
const STYLE_VARIABLE_NAME = '__rsgStyles';
const THEME_VARIABLE_NAME = '__rsgTheme';

function _default() {}

function pitch() {
  // Clear cache so it would detect new or renamed files
  fileExistsCaseInsensitive.clearCache(); // Reset slugger for each code reload to be deterministic

  _slugger.default.reset();

  const config = this._styleguidist;
  let sections = (0, _getSections.default)(config.sections, config);

  if (config.skipComponentsWithoutExample) {
    sections = (0, _filterComponentsWithExample.default)(sections);
  }

  const allComponentFiles = (0, _getComponentFilesFromSections.default)(config.sections, config.configDir, config.ignore);
  const allContentPages = (0, _getAllContentPages.default)(sections); // Nothing to show in the style guide

  const welcomeScreen = allContentPages.length === 0 && allComponentFiles.length === 0;
  const patterns = welcomeScreen ? (0, _getComponentPatternsFromSections.default)(config.sections) : undefined;
  logger.debug('Loading components:\n' + allComponentFiles.join('\n')); // Setup Webpack context dependencies to enable hot reload when adding new files

  if (config.contextDependencies) {
    config.contextDependencies.forEach(dir => this.addContextDependency(dir));
  } else if (allComponentFiles.length > 0) {
    // Use common parent directory of all components as a context
    this.addContextDependency((0, _commonDir.default)(allComponentFiles));
  }

  const configClone = { ...config
  };
  const styleContext = [];
  /**
   * Transforms a string variable member of config
   * it transforms this code
   * ```
   * {
   *  param: 'test/path'
   * }
   * ```
   * into this code
   * ```
   * {
   *  param: require('test/path')
   * }
   * ```
   *
   * because we have to account for ES module exports,
   * we add an extra step and transform it into aa statement
   * that can import es5 `module.exports` and ES modules `export default`
   *
   * so the code will ultimtely look like this
   *
   * ```
   * // es5 - es modules compatibility code
   * var obj$0 = require('test/path')
   * var obj = obj$0.default || obj$0
   *
   * {
   *  param: obj
   * }
   * ```
   *
   * @param memberName the name of the member of the object ("param" in the examples)
   * @param varName the name of the variable to use ("obj" in the last example)
   */

  const setVariableValueToObjectInFile = (memberName, varName) => {
    const configMember = config[memberName];

    if (typeof configMember === 'string') {
      // first attach the file as a dependency
      this.addDependency(configMember); // then create a variable to contain the value of the theme/style

      styleContext.push((0, _resolveESModule.default)(configMember, varName)); // Finally assign the calculted value to the member of the clone
      // NOTE: if we are mutating the config object without cloning it,
      // it changes the value for all hmr iteration
      // until the process is stopped.

      const variableAst = {}; // Then override the `toAST()` function, because we know
      // what the output of it should be, an identifier

      Object.defineProperty(variableAst, 'toAST', {
        enumerable: false,

        value() {
          return _astTypes.builders.identifier(varName);
        }

      });
      configClone[memberName] = variableAst;
    }
  };

  setVariableValueToObjectInFile('styles', STYLE_VARIABLE_NAME);
  setVariableValueToObjectInFile('theme', THEME_VARIABLE_NAME);
  const styleguide = {
    config: (0, _pick.default)(configClone, CLIENT_CONFIG_OPTIONS),
    welcomeScreen,
    patterns,
    sections
  };
  return `${(0, _escodegen.generate)(_astTypes.builders.program((0, _flatten.default)(styleContext)))}
if (module.hot) {
	module.hot.accept([])
}
module.exports = ${(0, _escodegen.generate)((0, _toAst.default)(styleguide))}
`;
}