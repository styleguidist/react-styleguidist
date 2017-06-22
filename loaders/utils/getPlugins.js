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
	return map(plugins, (options, module) => ({
		module: requireIt(module),
		options,
	}));
};
