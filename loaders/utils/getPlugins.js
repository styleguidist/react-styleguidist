'use strict';

const map = require('lodash/map');
const requireIt = require('./requireIt');

/**
 * TODO
 *
 * @param {object} plugins
 * @returns {object[]}
 */
module.exports = function getPlugins(plugins) {
	return map(plugins, module => {
		const path = typeof module === 'string' ? module : module[0];
		const options = typeof module === 'string' ? {} : module[1];
		return {
			module: requireIt(path),
			options,
		};
	});
};
