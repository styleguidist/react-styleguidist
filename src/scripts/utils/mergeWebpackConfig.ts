import mergeBase from 'webpack-merge';
import isFunction from 'lodash/isFunction';
import omit from 'lodash/omit';
import { Configuration } from 'webpack';
import { Tapable } from 'tapable';

type Mode = Configuration['mode'];

const IGNORE_SECTIONS = ['entry', 'externals', 'output', 'watch', 'stats', 'styleguidist'] as const;
const IGNORE_SECTIONS_ENV = {
	development: IGNORE_SECTIONS,
	// For production builds, we'll ignore devtool settings to avoid
	// source mapping bloat.
	production: [...IGNORE_SECTIONS, 'devtool'],
	none: [],
} as const;

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

const IGNORE_LOADERS = ['style-loader'];

const merge = mergeBase({
	// Ignore user’s plugins to avoid duplicates and issues with our plugins
	customizeArray: mergeBase.unique(
		'plugins',
		IGNORE_PLUGINS,
		(plugin: Tapable.Plugin) => plugin.constructor && plugin.constructor.name
	),
});

type MetaConfig = Configuration | ((env: Mode) => Configuration);

/**
 * Merge two Webpack configs.
 *
 * In the user config:
 * - Ignores given sections (options.ignore).
 * - Ignores plugins that shouldn’t be used twice or may cause issues.
 */
export default function mergeWebpackConfig(
	baseConfig: Configuration,
	userConfig: MetaConfig,
	env: Mode = 'production'
) {
	const userConfigObject = isFunction(userConfig) ? userConfig(env) : userConfig;
	const safeUserConfig = omit(userConfigObject, IGNORE_SECTIONS_ENV[env]);
	return merge(baseConfig, safeUserConfig);
}
