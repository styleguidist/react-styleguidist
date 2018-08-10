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
const getRequires = require('./utils/getRequires');
const requireIt = require('./utils/requireIt');

const absolutize = filepath => path.resolve(__dirname, filepath);

function examplesLoader(source) {
	const query = loaderUtils.getOptions(this) || {};
	const config = this._styleguidist;

	// Append React to context modules, since it’s required for JSX
	const fullContext = Object.assign({ React: 'react' }, config.context);

	// Replace placeholders (__COMPONENT__) with the passed-in component name
	if (query.componentName) {
		source = expandDefaultComponent(source, query.componentName);
	}

	const updateExample = config.updateExample
		? props => config.updateExample(props, this.resourcePath)
		: undefined;

	// Load examples
	const examples = chunkify(source, updateExample);

	// Find all import statements and require() calls in examples to make them
	// available in webpack context at runtime.
	// Note that we can't just use require() directly at runtime,
	// because webpack changes its name to something like __webpack__require__().
	const allCodeExamples = filter(examples, { type: 'code' });
	const requiresFromExamples = allCodeExamples.reduce((requires, example) => {
		return requires.concat(getRequires(example.content));
	}, []);

	// React + context requires + example requires
	const allRequires = requiresFromExamples.concat(values(fullContext));

	// “Prerequire” modules required in Markdown examples and context so they
	// end up in a bundle and be available at runtime
	const allRequiresCode = allRequires.reduce((requires, requireRequest) => {
		requires[requireRequest] = requireIt(requireRequest);
		return requires;
	}, {});

	// Require context modules so they are available in an example
	const requireContextCode = b.program(
		map(fullContext, (requireRequest, name) =>
			b.variableDeclaration('var', [
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

var requireMap = ${generate(toAst(allRequiresCode))};
var requireInRuntimeBase = require(${JSON.stringify(absolutize('utils/client/requireInRuntime'))});
var requireInRuntime = requireInRuntimeBase.bind(null, requireMap);
var evalInContextBase = require(${JSON.stringify(absolutize('utils/client/evalInContext'))});
var evalInContext = evalInContextBase.bind(null, ${JSON.stringify(
		generate(requireContextCode)
	)}, requireInRuntime);

module.exports = ${generate(toAst(examplesWithEval))}
	`;
}

module.exports = examplesLoader;
