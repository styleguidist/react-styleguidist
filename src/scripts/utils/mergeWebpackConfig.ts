import mergeBase from 'webpack-merge';
import isFunction from 'lodash/isFunction';
import omit from 'lodash/omit';
import { Configuration, WebpackPluginInstance } from 'webpack';

const IGNORE_SECTIONS = ['entry', 'externals', 'output', 'watch', 'stats', 'styleguidist'];
const IGNORE_SECTIONS_ENV: Record<string, string[]> = {
	development: [],
	// For production builds, we'll ignore devtool settings to avoid
	// source mapping bloat.
	production: ['devtool'],
};

const IGNORE_PLUGINS = [
	'CommonsChunkPlugins',
	'MiniHtmlWebpackPlugin',
	'HtmlWebpackPlugin',
	'OccurrenceOrderPlugin',
	'DedupePlugin',
	'UglifyJsPlugin',
	'TerserPlugin',
	'HotModuleReplacementPlugin',
];

const merge = mergeBase({
	// Ignore user’s plugins to avoid duplicates and issues with our plugins
	customizeArray: mergeBase.unique(
		'plugins',
		IGNORE_PLUGINS,
		(plugin: WebpackPluginInstance) => plugin.constructor && plugin.constructor.name
	),
});

type MetaConfig = Configuration | ((env?: string) => Configuration);

/**
 * Merge two Webpack configs.
 *
 * In the user config:
 * - Ignores given sections (options.ignore).
 * - Ignores plugins that shouldn’t be used twice or may cause issues.
 *
 * @param {object} baseConfig
 * @param {object|Function} userConfig
 * @param {string} env
 * @return {object}
 */
export default function mergeWebpackConfig(
	baseConfig: MetaConfig,
	userConfig: MetaConfig,
	env = 'production'
) {
	const userConfigObject = isFunction(userConfig) ? userConfig(env) : userConfig;
	const safeUserConfig = omit(userConfigObject, IGNORE_SECTIONS.concat(IGNORE_SECTIONS_ENV[env]));
	return merge(baseConfig, safeUserConfig);
}
