import webpack from 'webpack';
// Make sure user has webpack installed
import './utils/ensureWebpack';

import makeWebpackConfig from './make-webpack-config';
import build from './build';
import server from './server';
import getConfig from './config';
import setupLogger from './logger';
import * as Rsg from '../typings';

/**
 * Initialize Styleguide API.
 *
 * @param {object} [config] Styleguidist config.
 * @returns {object} API.
 */
export default function (configArg?: Rsg.StyleguidistConfig | string) {
	const config = getConfig(configArg, (conf) => {
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
			callback: (
				err: Error,
				styleguidistConfig: Rsg.SanitizedStyleguidistConfig,
				stats: webpack.Stats
			) => void
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
		server(
			callback: (
				err: Error | undefined,
				styleguidistConfig: Rsg.SanitizedStyleguidistConfig
			) => void
		) {
			return server(config, (err) => callback(err, config));
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
}
