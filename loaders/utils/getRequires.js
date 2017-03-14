'use strict';

// Need to supply the regex test as a string for reuse in unit tests
// Currently, trying to change flags throws a TypeError
// Slated for change in ES6, but not possible now:
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/RegExp#Description
const REQUIRE_ANYTHING_BASE = 'require\\s*\\(([^)]+)\\)';
const REQUIRE_ANYTHING_REGEX = new RegExp(REQUIRE_ANYTHING_BASE, 'g');

const IMPORT_ANYTHING_BASE = 'import .+ from (.+)';
const IMPORT_ANYTHING_REGEX = new RegExp(IMPORT_ANYTHING_BASE, 'g');

const SIMPLE_STRING_REGEX = /^"([^"]+)"$|^'([^']+)'$/;

function getRequiresWithRegex(code, regex, requires) {
	code.replace(regex, function(requireExprMatch, requiredExpr) {
		const requireStrMatch = SIMPLE_STRING_REGEX.exec(requiredExpr.trim());
		if (!requireStrMatch) {
			throw new Error(`Requires using expressions are not supported in examples. (Used: ${requireExprMatch})`);
		}
		const requiredString = requireStrMatch[1] ? requireStrMatch[1] : requireStrMatch[2];
		requires[requiredString] = true;
	});
}

/**
 * Returns a list of all strings used in require(...) calls in the given source code.
 * If there is any other expression inside the require call, it throws an error.
 *
 * @param {string} code
 * @returns {Array}
 */
module.exports = function getRequires(code) {
	const requires = {};
	getRequiresWithRegex(code, REQUIRE_ANYTHING_REGEX, requires);
	getRequiresWithRegex(code, IMPORT_ANYTHING_REGEX, requires);

	return Object.keys(requires);
};

Object.assign(module.exports, {
	REQUIRE_ANYTHING_BASE,
	REQUIRE_ANYTHING_REGEX,
	SIMPLE_STRING_REGEX,
});
