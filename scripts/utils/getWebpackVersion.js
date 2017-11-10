'use strict';

const semverUtils = require('semver-utils');

/**
 * Return installed Webpack version.
 *
 * @return {number}
 */
module.exports = function getWebpackVersion() {
	try {
		return Number(semverUtils.parseRange(require('webpack/package.json').version)[0].major);
	} catch (err) {
		return undefined;
	}
};
