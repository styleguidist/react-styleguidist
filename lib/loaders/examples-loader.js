"use strict";

exports.__esModule = true;
exports.default = examplesLoader;

var _path = _interopRequireDefault(require("path"));

var _filter = _interopRequireDefault(require("lodash/filter"));

var _map = _interopRequireDefault(require("lodash/map"));

var _values = _interopRequireDefault(require("lodash/values"));

var _flatten = _interopRequireDefault(require("lodash/flatten"));

var _loaderUtils = _interopRequireDefault(require("loader-utils"));

var _escodegen = require("escodegen");

var _toAst = _interopRequireDefault(require("to-ast"));

var _astTypes = require("ast-types");

var _chunkify = _interopRequireDefault(require("./utils/chunkify"));

var _expandDefaultComponent = _interopRequireDefault(require("./utils/expandDefaultComponent"));

var _getImports = _interopRequireDefault(require("./utils/getImports"));

var _requireIt = _interopRequireDefault(require("./utils/requireIt"));

var _resolveESModule = _interopRequireDefault(require("./utils/resolveESModule"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const absolutize = filepath => _path.default.resolve(__dirname, filepath);

const REQUIRE_IN_RUNTIME_PATH = absolutize('utils/client/requireInRuntime');
const EVAL_IN_CONTEXT_PATH = absolutize('utils/client/evalInContext');

function examplesLoader(source) {
  const config = this._styleguidist;
  const {
    file,
    displayName,
    shouldShowDefaultExample,
    customLangs
  } = _loaderUtils.default.getOptions(this) || {}; // Replace placeholders (__COMPONENT__) with the passed-in component name

  if (shouldShowDefaultExample) {
    source = (0, _expandDefaultComponent.default)(source, displayName);
  }

  const updateExample = config.updateExample ? props => config.updateExample(props, this.resourcePath) : undefined; // Load examples

  const examples = (0, _chunkify.default)(source, updateExample, customLangs); // Find all import statements and require() calls in examples to make them
  // available in webpack context at runtime.
  // Note that we can't just use require() directly at runtime,
  // because webpack changes its name to something like __webpack__require__().

  const allCodeExamples = (0, _filter.default)(examples, {
    type: 'code'
  });
  const requiresFromExamples = allCodeExamples.reduce((requires, example) => {
    return requires.concat((0, _getImports.default)(example.content));
  }, []); // Auto imported modules.
  // We don't need to do anything here to support explicit imports: they will
  // work because both imports (generated below and by rewrite-imports) will
  // be eventually transpiled to `var x = require('x')`, so we'll just have two
  // of them in the same scope, which is fine in non-strict mode

  const fullContext = { // Modules, provied by the user
    ...config.context,
    // Append React, because it’s required for JSX
    React: 'react',
    // Append the current component module to make it accessible in examples
    // without an explicit import
    // TODO: Do not leak absolute path
    ...(displayName ? {
      [displayName]: file
    } : {})
  }; // All required or imported modules, either explicitly in examples code
  // or implicitly (React, current component and context config option)

  const allModules = [...requiresFromExamples, ...(0, _values.default)(fullContext)]; // “Prerequire” modules required in Markdown examples and context so they
  // end up in a bundle and be available at runtime

  const allModulesCode = allModules.reduce((requires, requireRequest) => {
    requires[requireRequest] = (0, _requireIt.default)(requireRequest);
    return requires;
  }, {}); // Require context modules so they are available in an example

  const requireContextCode = _astTypes.builders.program((0, _flatten.default)((0, _map.default)(fullContext, _resolveESModule.default))); // Stringify examples object except the evalInContext function


  const examplesWithEval = examples.map(example => {
    if (example.type === 'code') {
      return { ...example,
        evalInContext: {
          toAST: () => _astTypes.builders.identifier('evalInContext')
        }
      };
    } else {
      return example;
    }
  });
  return `
if (module.hot) {
	module.hot.accept([])
}

var requireMap = ${(0, _escodegen.generate)((0, _toAst.default)(allModulesCode))};
var requireInRuntimeBase = require(${JSON.stringify(REQUIRE_IN_RUNTIME_PATH)}).default;
var requireInRuntime = requireInRuntimeBase.bind(null, requireMap);
var evalInContextBase = require(${JSON.stringify(absolutize(EVAL_IN_CONTEXT_PATH))}).default;
var evalInContext = evalInContextBase.bind(null, ${JSON.stringify((0, _escodegen.generate)(requireContextCode))}, requireInRuntime);

module.exports = ${(0, _escodegen.generate)((0, _toAst.default)(examplesWithEval))}
	`;
}