const _ = require('lodash');
const loaderUtils = require('loader-utils');
const chunkify = require('./utils/chunkify');
const getRequires = require('./utils/getRequires');

const EVAL_PLACEHOLDER = '<%{#eval#}%>';
const EVAL_PLACEHOLDER_REGEXP = new RegExp(_.escapeRegExp(JSON.stringify(EVAL_PLACEHOLDER)), 'g');

function examplesLoader(source) {
	if (this.cacheable) {
		this.cacheable();
	}

	// Replace __COMPONENT__ placeholders with the passed-in componentName
	const componentName = loaderUtils.parseQuery(this.query).componentName || '__COMPONENT__';
	source = source.replace(/__COMPONENT__/g, componentName);

	// Load examples
	let examples = chunkify(source);
	examples = examples.map(example => {
		if (example.type === 'code') {
			example.evalInContext = EVAL_PLACEHOLDER;
		}
		return example;
	});

	// We're analysing the examples' source code to figure out the require statements. We do it manually with regexes,
	// because webpack unfortunately doesn't expose its smart logic for rewriting requires
	// (https://webpack.github.io/docs/context.html). Note that we can't just use require(...) directly in runtime,
	// because webpack changes its name to __webpack__require__ or sth.
	const codeFromAllExamples = _.map(_.filter(examples, { type: 'code' }), 'content').join('\n');
	const requiresFromExamples = getRequires(codeFromAllExamples);

	const requireMapCode = requiresFromExamples.map(requireRequest => {
		requireRequest = JSON.stringify(requireRequest);
		return `${requireRequest}: require(${requireRequest})`;
	}).join(',\n');

	const examplesCode = JSON.stringify(examples).replace(
		EVAL_PLACEHOLDER_REGEXP,
		`
		function(code) {
			var func = new Function ('require', 'state', 'setState', '__initialStateCB', code);
			return func.bind(null, requireInRuntime);
		}
		`
	);

	return `
		if (module.hot) {
			module.hot.accept([]);
		}
		
		var requireMap = {
			${requireMapCode}
		};
		
		function requireInRuntime(path) {
			if (!requireMap.hasOwnProperty(path)) {
				throw new Error('require() statements can be added only by editing a Markdown example file.');
			}
			return requireMap[path];
		}
		
		module.exports = ${examplesCode};
	`;
}

module.exports = examplesLoader;
