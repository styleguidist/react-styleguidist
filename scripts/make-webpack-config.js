'use strict';

/* eslint-disable no-console */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const hasJsonLoader = require('./utils/hasJsonLoader');
const getWebpackVersion = require('./utils/getWebpackVersion');
const mergeWebpackConfig = require('./utils/mergeWebpackConfig');
const StyleguidistOptionsPlugin = require('./utils/StyleguidistOptionsPlugin');

const isWebpack2 = getWebpackVersion() === 2;
const sourceDir = path.resolve(__dirname, '../lib');

module.exports = function(config, env) {
	process.env.NODE_ENV = env;

	const isProd = env === 'production';

	let webpackConfig = {
		entry: [],
		output: {
			path: config.styleguideDir,
			filename: 'build/bundle.js',
			chunkFilename: 'build/[name].js',
		},
		resolve: {
			alias: {
				'rsg-codemirror-theme.css': `codemirror/theme/${config.highlightTheme}.css`,
			},
		},
		plugins: [
			new HtmlWebpackPlugin({
				title: config.title,
				template: config.template,
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

	if (isWebpack2) {
		webpackConfig = merge(webpackConfig, {
			resolve: {
				extensions: ['.js', '.jsx', '.json'],
			},
			plugins: [
				new StyleguidistOptionsPlugin(config),
			],
		});
	}
	else {
		webpackConfig = merge(webpackConfig, {
			styleguidist: config,
			resolve: {
				extensions: ['.js', '.jsx', '.json', ''],
			},
			debug: config.verbose,
		});
	}

	if (isProd) {
		webpackConfig = merge(webpackConfig, {
			devtool: false,
			cache: false,
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
			],
		});
		if (!isWebpack2) {
			webpackConfig.plugins.push(new webpack.optimize.DedupePlugin());
		}
	}
	else {
		webpackConfig = merge(webpackConfig, {
			entry: [
				require.resolve('react-dev-utils/webpackHotDevClient'),
			],
			cache: true,
			devtool: 'eval',
			stats: {
				colors: true,
				reasons: true,
			},
			plugins: [
				new webpack.HotModuleReplacementPlugin(),
			],
		});
	}

	if (config.webpackConfigFile) {
		const userConfigModule = require(config.webpackConfigFile);
		webpackConfig = mergeWebpackConfig(webpackConfig, userConfigModule, {
			ignore: ['entry', 'externals', 'output', 'styleguidist'],
			env,
		});
	}

	if (config.webpackConfig) {
		webpackConfig = mergeWebpackConfig(webpackConfig, config.webpackConfig, {
			ignore: ['output', 'styleguidist'],
			env,
		});
	}

	// Add JSON loader if user config has no one (Webpack 2 includes it by default)
	if (!isWebpack2 && !hasJsonLoader(webpackConfig)) {
		webpackConfig.module.loaders.push({
			test: /\.json$/,
			loader: 'json-loader',
		});
	}

	// Add Styleguidist’s entry point after user’s entry points so things like polyfills would work
	webpackConfig.entry.push(path.resolve(sourceDir, 'index'));

	// Add components folder alias at the end so users can override our components to customize the style guide
	// (their aliases should be before this one)
	webpackConfig.resolve.alias['rsg-components'] = path.resolve(sourceDir, 'rsg-components');

	if (config.updateWebpackConfig) {
		webpackConfig = config.updateWebpackConfig(webpackConfig, env);
	}

	return webpackConfig;
};
