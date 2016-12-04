'use strict';

const path = require('path');

/**
 * Return fallback component name:
 * - folder name if file name is 'index'
 * - file name otherwise
 *
 * @param {string} filepath
 * @returns {string}
 */
module.exports = function getNameFallback(filepath) {
	const filename = path.parse(filepath).name;
	return filename === 'index'
		? path.basename(path.dirname(filepath))
		: filename
	;
};
