'use strict';

const escapeRegExp = require('lodash/escapeRegExp');
const filter = require('lodash/filter');
const map = require('lodash/map');
const loaderUtils = require('loader-utils');
const chunkify = require('./utils/chunkify');
const getRequires = require('./utils/getRequires');

const EVAL_PLACEHOLDER = '<%{#eval#}%>';
const EVAL_PLACEHOLDER_REGEXP = new RegExp(escapeRegExp(JSON.stringify(EVAL_PLACEHOLDER)), 'g');

const COMPONENT_PLACEHOLDER = '__COMPONENT__';
const COMPONENT_PLACEHOLDER_REGEXP = new RegExp(escapeRegExp(COMPONENT_PLACEHOLDER), 'g');

function examplesLoader(source) {
	if (this.cacheable) {
		this.cacheable();
	}

	const config = this.options.styleguidist;

	// Replace __COMPONENT__ placeholders with the passed-in componentName
	const query = loaderUtils.parseQuery(this.query);
	const componentName = query.componentName || COMPONENT_PLACEHOLDER;
	source = source.replace(COMPONENT_PLACEHOLDER_REGEXP, componentName);

	// Load examples
	let examples = chunkify(source);

	// We're analysing the examples' source code to figure out the require statements. We do it manually with regexes,
	// because webpack unfortunately doesn't expose its smart logic for rewriting requires
	// (https://webpack.github.io/docs/context.html). Note that we can't just use require(...) directly in runtime,
	// because webpack changes its name to __webpack__require__ or something.
	const codeFromAllExamples = map(filter(examples, { type: 'code' }), 'content').join('\n');
	const requiresFromExamples = getRequires(codeFromAllExamples);
	const allRequires = Object.assign({}, requiresFromExamples, config.context);

	// “Prerequire” modules required in Markdown examples and context so they end up in a bundle and be available at runtime
	const requireMapCode = map(allRequires, requireRequest => {
		const safeRequest = JSON.stringify(requireRequest);
		return `${safeRequest}: require(${safeRequest})`;
	}).join(',\n');

	// Require context modules so they are available in an example
	const requireContextCode = map(config.context, (requireRequest, name) =>
		`var ${name} = require(${JSON.stringify(requireRequest)})`
	).join(';\\n');

	// Require module if it was “prerequired”
	const requireInRuntimeCode = `
		function requireInRuntime(path) {
			if (!requireMap.hasOwnProperty(path)) {
				throw new Error('require() statements can be added only by editing a Markdown example file.');
			}
			return requireMap[path];
		}
	`;

	// 1. Prepend the example code with requires for context modules
	// 2. Create a function from the code
	// 3. Partially apply the first parameter to map our custom requireInRuntime function to the require local variable
	const evalInContextCode = `
		function evalInContext(code) {
			var func = new Function(
				'require',
				'state',
				'setState',
				'__initialStateCB',
				'${requireContextCode}\\n' + code
			);
			return func.bind(null, requireInRuntime);
		}
	`;

	// Stringify examples object except the evalInContext
	examples = examples.map(example => {
		if (example.type === 'code') {
			example.evalInContext = EVAL_PLACEHOLDER;
		}
		return example;
	});
	const examplesCode = JSON.stringify(examples, null, '  ').replace(EVAL_PLACEHOLDER_REGEXP, 'evalInContext');

	return `
		if (module.hot) {
			module.hot.accept([]);
		}

		var requireMap = {
			${requireMapCode}
		};

		${requireInRuntimeCode}

		${evalInContextCode}

		module.exports = ${examplesCode};
	`;
}

module.exports = examplesLoader;
