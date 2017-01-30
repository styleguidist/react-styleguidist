'use strict';

const isFunction = require('lodash/isFunction');
const omit = require('lodash/omit');
const mergeBase = require('webpack-merge');
const loaderOptionsMerge = require('webpack-loader-options-merge');

const IGNORE_PLUGINS = [
	'CommonsChunkPlugins',
	'HtmlWebpackPlugin',
	'OccurrenceOrderPlugin',
	'DedupePlugin',
	'UglifyJsPlugin',
	'HotModuleReplacementPlugin',
];

const merge = mergeBase({
	// Ignore user’s plugins to avoid duplicates and issues with our plugins
	customizeArray: mergeBase.unique(
		'plugins',
		IGNORE_PLUGINS,
		plugin => plugin.constructor && plugin.constructor.name
	),
});

/**
 * Merge two Webpack configs.
 *
 * In the user config:
 * - Ignores given sections (options.ignore).
 * - Ignores plugins that shouldn’t be used twice or may cause issues.
 *
 * @param {object} baseConfig
 * @param {object|Function} userConfig
 * @param {object} options
 * @param {string} options.env
 * @param {Array} options.ignore
 * @return {object}
 */
module.exports = function mergeWebpackConfig(baseConfig, userConfig, options) {
	const userConfigObject = isFunction(userConfig)
		? userConfig(options.env)
		: userConfig
	;
	const safeUserConfig = omit(userConfigObject, options.ignore);
	const mergedConfig = merge(baseConfig, safeUserConfig);
	return loaderOptionsMerge(mergedConfig);
};
