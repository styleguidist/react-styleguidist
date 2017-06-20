'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const hasJsonLoader = require('./utils/hasJsonLoader');
const getWebpackVersion = require('./utils/getWebpackVersion');
const mergeWebpackConfig = require('./utils/mergeWebpackConfig');
const StyleguidistOptionsPlugin = require('./utils/StyleguidistOptionsPlugin');

const isWebpack1 = getWebpackVersion() < 2;
const sourceDir = path.resolve(__dirname, '../lib');
const htmlLoader = require.resolve('html-webpack-plugin/lib/loader');

module.exports = function(config, env) {
	process.env.NODE_ENV = process.env.NODE_ENV || env;

	if (isWebpack1) {
		// eslint-disable-next-line no-console
		console.log(
			'Warning: support for webpack 1 will be removed in the next major version of React Styleguidist.'
		);
	}

	const isProd = env === 'production';

	let webpackConfig = {
		entry: config.require.concat([path.resolve(sourceDir, 'index')]),
		output: {
			path: config.styleguideDir,
			filename: 'build/[name].bundle.js',
			chunkFilename: 'build/[name].js',
		},
		resolve: {
			extensions: isWebpack1 ? ['.js', '.jsx', '.json', ''] : ['.js', '.jsx', '.json'],
			alias: {
				'rsg-codemirror-theme.css': `codemirror/theme/${config.highlightTheme}.css`,
			},
		},
		plugins: [
			new StyleguidistOptionsPlugin(config),
			new HtmlWebpackPlugin({
				title: config.title,
				template: `!!${htmlLoader}!${config.template}`,
				inject: true,
			}),
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify(env),
				},
			}),
		],
		performance: {
			hints: false,
		},
	};

	if (isProd) {
		webpackConfig = merge(webpackConfig, {
			output: {
				filename: 'build/bundle.[chunkhash:8].js',
				chunkFilename: 'build/[name].[chunkhash:8].js',
			},
			plugins: [
				new webpack.optimize.OccurrenceOrderPlugin(),
				new webpack.optimize.UglifyJsPlugin({
					compress: {
						keep_fnames: true,
						screw_ie8: true,
						warnings: false,
					},
					output: {
						comments: false,
					},
					mangle: {
						keep_fnames: true,
					},
				}),
				new CleanWebpackPlugin(['build'], {
					root: config.styleguideDir,
					verbose: config.verbose,
				}),
			],
		});
		if (isWebpack1) {
			webpackConfig.plugins.push(new webpack.optimize.DedupePlugin());
		}
	} else {
		webpackConfig = merge(webpackConfig, {
			entry: [require.resolve('react-dev-utils/webpackHotDevClient')],
			stats: {
				colors: true,
				reasons: true,
			},
			plugins: [new webpack.HotModuleReplacementPlugin()],
		});
	}

	if (config.webpackConfig) {
		webpackConfig = mergeWebpackConfig(webpackConfig, config.webpackConfig, env);
	}

	// Add JSON loader if user config has no one (Webpack 2 includes it by default)
	if (isWebpack1 && !hasJsonLoader(webpackConfig)) {
		webpackConfig = merge(webpackConfig, {
			module: {
				loaders: [
					{
						test: /\.json$/,
						loader: 'json-loader',
					},
				],
			},
		});
	}

	// Add components folder alias at the end so users can override our components to customize the style guide
	// (their aliases should be before this one)
	webpackConfig.resolve.alias['rsg-components'] = path.resolve(sourceDir, 'rsg-components');

	if (config.dangerouslyUpdateWebpackConfig) {
		webpackConfig = config.dangerouslyUpdateWebpackConfig(webpackConfig, env);
	}

	return webpackConfig;
};
