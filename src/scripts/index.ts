import webpack from 'webpack';
// Make sure user has webpack installed
import './utils/ensureWebpack';

import makeWebpackConfig from './make-webpack-config';
import build from './build';
import server from './server';
import getConfig from './config';
import setupLogger from './logger';

/**
 * Initialize Styleguide API.
 *
 * NOTE: here we export an CommonJs module to avoid breaking the API
 * TODO: in the next major version, use `export default` instead
 *
 * @param {object} [config] Styleguidist config.
 * @returns {object} API.
 */
module.exports = function(configArg?: Rsg.StyleguidistConfig | string) {
	const config = getConfig(configArg, conf => {
		setupLogger(conf.logger as Record<string, (msg: string) => void>, conf.verbose, {});
		return conf;
	});

	return {
		/**
		 * Build style guide.
		 *
		 * @param {Function} callback callback(err, config, stats).
		 * @return {Compiler} Webpack Compiler instance.
		 */
		build(
			callback: (err: Error, config: Rsg.SanitizedStyleguidistConfig, stats: webpack.Stats) => void
		) {
			return build(config, (err: Error, stats: webpack.Stats) => callback(err, config, stats));
		},

		/**
		 * Start style guide dev server.
		 *
		 * @param {Function} callback callback(err, config).
		 * @return {ServerInfo.App} Webpack-Dev-Server.
		 * @return {ServerInfo.Compiler} Webpack Compiler instance.
		 */
		server(callback: (err: Error | undefined, config: Rsg.SanitizedStyleguidistConfig) => void) {
			return server(config, err => callback(err, config));
		},

		/**
		 * Return Styleguidist Webpack config.
		 *
		 * @param {string} [env=production] 'production' or 'development'.
		 * @return {object}
		 */
		makeWebpackConfig(env?: 'development' | 'production' | 'none') {
			return makeWebpackConfig(config, env || 'production');
		},
	};
};
