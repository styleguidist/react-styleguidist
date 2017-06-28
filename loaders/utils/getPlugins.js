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
		// './plugin/test' vs [ './plugin/test', { options } ]
		const moduleIsString = typeof module === 'string';
		const path = moduleIsString ? module : module[0];
		const options = moduleIsString ? {} : module[1];
		return {
			module: requireIt(path),
			options,
		};
	});
};
