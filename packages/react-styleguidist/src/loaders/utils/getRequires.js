const matchRequire = require('match-require');

/**
 * Returns a list of all strings used in import statements or require() calls
 *
 * @param {string} code
 * @return {string[]}
 */
module.exports = function getRequires(code) {
	return matchRequire.findAll(code);
};
