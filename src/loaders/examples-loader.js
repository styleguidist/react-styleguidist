const path = require('path');
const filter = require('lodash/filter');
const map = require('lodash/map');
const values = require('lodash/values');
const loaderUtils = require('loader-utils');
const generate = require('escodegen').generate;
const toAst = require('to-ast');
const b = require('ast-types').builders;
const chunkify = require('./utils/chunkify');
const expandDefaultComponent = require('./utils/expandDefaultComponent');
const getImports = require('./utils/getImports').default;
const requireIt = require('./utils/requireIt');

const absolutize = filepath => path.resolve(__dirname, filepath);

const REQUIRE_IN_RUNTIME_PATH = absolutize('utils/client/requireInRuntime');
const EVAL_IN_CONTEXT_PATH = absolutize('utils/client/evalInContext');

function examplesLoader(source) {
	const config = this._styleguidist;
	const { file, displayName, shouldShowDefaultExample, customLangs } =
		loaderUtils.getOptions(this) || {};

	// Replace placeholders (__COMPONENT__) with the passed-in component name
	if (shouldShowDefaultExample) {
		source = expandDefaultComponent(source, displayName);
	}

	const updateExample = config.updateExample
		? props => config.updateExample(props, this.resourcePath)
		: undefined;

	// Load examples
	const examples = chunkify(source, updateExample, customLangs);

	// Find all import statements and require() calls in examples to make them
	// available in webpack context at runtime.
	// Note that we can't just use require() directly at runtime,
	// because webpack changes its name to something like __webpack__require__().
	const allCodeExamples = filter(examples, { type: 'code' });
	const requiresFromExamples = allCodeExamples.reduce((requires, example) => {
		return requires.concat(getImports(example.content));
	}, []);

	// Auto imported modules.
	// We don't need to do anything here to support explicit imports: they will
	// work because both imports (generated below and by rewrite-imports) will
	// be eventually transpiled to `var x = require('x')`, so we'll just have two
	// of them in the same scope, which is fine in non-strict mode
	const fullContext = {
		// Modules, provied by the user
		...config.context,
		// Append React, because it’s required for JSX
		React: 'react',
		// Append the current component module to make it accessible in examples
		// without an explicit import
		// TODO: Do not leak absolute path
		...(displayName ? { [displayName]: file } : {}),
	};

	// All required or imported modules, either explicitly in examples code
	// or implicitly (React, current component and context config option)
	const allModules = [...requiresFromExamples, ...values(fullContext)];

	// “Prerequire” modules required in Markdown examples and context so they
	// end up in a bundle and be available at runtime
	const allModulesCode = allModules.reduce((requires, requireRequest) => {
		requires[requireRequest] = requireIt(requireRequest);
		return requires;
	}, {});

	// Require context modules so they are available in an example
	const requireContextCode = b.program(
		// const name = require(path)
		map(fullContext, (requireRequest, name) =>
			b.variableDeclaration('const', [
				b.variableDeclarator(b.identifier(name), requireIt(requireRequest).toAST()),
			])
		)
	);

	// Stringify examples object except the evalInContext function
	const examplesWithEval = examples.map(example => {
		if (example.type === 'code') {
			example.evalInContext = { toAST: () => b.identifier('evalInContext') };
		}
		return example;
	});

	return `
if (module.hot) {
	module.hot.accept([])
}

var requireMap = ${generate(toAst(allModulesCode))};
var requireInRuntimeBase = require(${JSON.stringify(REQUIRE_IN_RUNTIME_PATH)}).default;
var requireInRuntime = requireInRuntimeBase.bind(null, requireMap);
var evalInContextBase = require(${JSON.stringify(absolutize(EVAL_IN_CONTEXT_PATH))}).default;
var evalInContext = evalInContextBase.bind(null, ${JSON.stringify(
		generate(requireContextCode)
	)}, requireInRuntime);

module.exports = ${generate(toAst(examplesWithEval))}
	`;
}

module.exports = examplesLoader;
