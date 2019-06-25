const fs = require('fs');
const path = require('path');
const memoize = require('lodash/memoize');

const readdirSync = memoize(fs.readdirSync);

/**
 * Find a file in a directory, case-insensitive
 *
 * @param {string} filepath
 * @return {string|undefined} File path with correct case
 */
module.exports = function findFileCaseInsensitive(filepath) {
	const dir = path.dirname(filepath);
	const fileNameLower = path.basename(filepath).toLowerCase();
	const files = readdirSync(dir);
	const found = files.find(file => file.toLowerCase() === fileNameLower);
	return found && path.join(dir, found);
};

/**
 * Clear cache.
 */
module.exports.clearCache = function() {
	readdirSync.cache.clear();
};
