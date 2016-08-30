var _ = require('lodash');
var loaderUtils = require('loader-utils');
var chunkify = require('./utils/chunkify');

const EVAL_PLACEHOLDER = '<%{#eval#}%>';

// Need to supply the regex test as a string for reuse in unit tests
// Currently, trying to change flags throws a TypeError
// Slated for change in ES6, but not possible now:
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/RegExp#Description
var requireAnythingTest = 'require\\s*\\(([^)]+)\\)';
var requireAnythingRegex = new RegExp(requireAnythingTest, 'g');
var simpleStringRegex = /^"([^"]+)"$|^'([^']+)'$/;

// Returns a list of all strings used in require(...) calls in the given source code.
// If there is any other expression inside the require call, it throws an error.
function findRequires(codeString) {
	var requires = {};
	codeString.replace(requireAnythingRegex, function(requireExprMatch, requiredExpr) {
		var requireStrMatch = simpleStringRegex.exec(requiredExpr.trim());
		if (!requireStrMatch) {
			throw new Error('Requires using expressions are not supported in examples. (Used: ' + requireExprMatch + ')');
		}
		var requiredString = requireStrMatch[1] ? requireStrMatch[1] : requireStrMatch[2];
		requires[requiredString] = true;
	});
	return Object.keys(requires);
}

function examplesLoader(source) {
	this.cacheable && this.cacheable();

	// Replace __COMPONENT__ placeholders with the passed-in componentName
	var componentName = loaderUtils.parseQuery(this.query).componentName || '__COMPONENT__';
	source = source.replace(/__COMPONENT__/g, componentName);

	// Load examples
	var examples = chunkify(source);
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
	var codeFromAllExamples = _.map(_.filter(examples, { type: 'code' }), 'content').join('\n');
	var requiresFromExamples = findRequires(codeFromAllExamples);

	return [
		'if (module.hot) {',
		'	module.hot.accept([]);',
		'}',
		'var requireMap = {',
		requiresFromExamples.map(function(requireRequest) {
			return JSON.stringify(requireRequest) + ': require(' + JSON.stringify(requireRequest) + ')';
		}).join(',\n'),
		'};',
		'function requireInRuntime(path) {',
		'	if (!requireMap.hasOwnProperty(path)) {',
		'		throw new Error("require() statements can be added only by editing a Markdown example file.")',
		'	}',
		'	return requireMap[path];',
		'}',
		'module.exports = ' + JSON.stringify(examples).replace(
			new RegExp(_.escapeRegExp(JSON.stringify(EVAL_PLACEHOLDER)), 'g'),
			'function(code) {' +
			'   var func = new Function (\"require\", \"state\", \"setState\", \"__initialStateCB\", code);' +
			'		return func.bind(null, requireInRuntime);' +
			'}'
		) + ';'
	].join('\n');
}

_.assign(examplesLoader, {
	requireAnythingTest: requireAnythingTest,
	requireAnythingRegex: requireAnythingRegex,
	simpleStringRegex: simpleStringRegex,
	findRequires: findRequires
});

module.exports = examplesLoader;
