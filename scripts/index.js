'use strict';

const build = require('./build');
const server = require('./server');
const makeWebpackConfig = require('./make-webpack-config');
const createServer = require('./create-server');
const getConfig = require('./config');

/**
 * Initialize Styleguide API.
 *
 * @param {object} [config] Styleguidist config.
 * @returns {object} API.
 */
module.exports = function(config) {
	config = getConfig(config);

	return {
		/**
		 * Build style guide.
		 *
		 * @param {Function} callback callback(err, config, stats).
		 * @return {Compiler} Webpack Compiler instance.
		 */
		build(callback) {
			return build(config, (err, stats) => callback(err, config, stats));
		},

		/**
		 * Start style guide dev server.
		 *
		 * @param {Function} callback callback(err, config).
		 * @return {Compiler} Webpack Compiler instance.
		 */
		server(callback) {
			return server(config, err => callback(err, config));
		},

		/**
		 * Return Styleguidist Webpack config.
		 *
		 * @param {string} [env=production] 'production' or 'development'.
		 * @return {object}
		 */
		makeWebpackConfig(env) {
			return makeWebpackConfig(config, env || 'production');
		},

		/**
		 * Return an info objected containing the created server instance and the instanced webapck
		 * compiler.
		 *
		 * @param {string} [env=production] 'production' or 'development'.
		 * @return {object}
		 */
		createServer(env) {
			return createServer(config, env || 'production');
		},
	};
};
