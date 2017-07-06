'use strict';

const path = require('path');

/**
 * Return user’s package.json.
 *
 * @return {object}
 */
module.exports = function getUserPackageJson() {
	return require(path.resolve(process.cwd(), 'package.json'));
};
