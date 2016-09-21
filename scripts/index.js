'use strict';

const build = require('./build');
const server = require('./server');
const makeWebpackConfig = require('./make-webpack-config');
const getConfig = require('./config');

module.exports = {
	/**
	 * Build style guide.
	 *
	 * @param {object} config Styleguidist config.
	 * @param {Function} callback callback(err, config, stats).
	 * @return {Compiler} Webpack Compiler instance.
	 */
	build(config, callback) {
		config = getConfig(config);
		return build(config, (err, stats) => callback(err, config, stats));
	},

	/**
	 * Start style guide dev server.
	 *
	 * @param {object} config Styleguidist config.
	 * @param {Function} callback callback(err, config).
	 * @return {Compiler} Webpack Compiler instance.
	 */
	server(config, callback) {
		config = getConfig(config);
		return server(config, err => callback(err, config));
	},

	/**
	 * Return Styleguidist Webpack config.
	 *
	 * @param {object} config Styleguidist config.
	 * @param {string} env 'production' or 'development'.
	 * @return {object}
	 */
	makeWebpackConfig(config, env) {
		config = getConfig(config);
		return makeWebpackConfig(config, env);
	},
};
