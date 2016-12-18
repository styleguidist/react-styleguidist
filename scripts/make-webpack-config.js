'use strict';

/* eslint-disable no-console */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const prettyjson = require('prettyjson');
const semverUtils = require('semver-utils');
const isFunction = require('lodash/isFunction');
const omit = require('lodash/omit');
const hasJsonLoader = require('./utils/hasJsonLoader');
const findUserWebpackConfig = require('./utils/findUserWebpackConfig');

const webpackVersion = semverUtils.parseRange(require('webpack/package.json').version)[0].major;
const isWebpack2 = webpackVersion === '2';

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
		module: {
			loaders: [],
		},
		performance: {
			hints: false,
		},
	};

	if (isWebpack2) {
		webpackConfig = merge(webpackConfig, {
			resolve: {
				extensions: ['.js', '.jsx', '.json'],
				modules: [
					sourceDir,
					'node_modules',
				],
			},
			plugins: [
				new webpack.LoaderOptionsPlugin({
					minimize: isProd,
					debug: !isProd,
					options: {
						styleguidist: config,
					},
				}),
			],
		});
	}
	else {
		webpackConfig = merge(webpackConfig, {
			styleguidist: config,
			resolve: {
				extensions: ['.js', '.jsx', '.json', ''],
				root: sourceDir,
				moduleDirectories: [
					'node_modules',
				],
			},
			debug: !isProd,
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
		const userConfigFile = config.webpackConfigFile === true
			? findUserWebpackConfig()
			: config.webpackConfigFile
		;
		if (userConfigFile) {
			const userConfigModule = require(userConfigFile);
			const userConfig = isFunction(userConfigModule)
				? userConfigModule(env)
				: userConfigModule
			;
			const safeUserConfig = omit(
				userConfig,
				['entry', 'output', 'plugins']
			);
			webpackConfig = merge(webpackConfig, safeUserConfig);
		}
	}

	if (config.webpackConfig) {
		const userConfig = isFunction(config.webpackConfig)
			? config.webpackConfig(env)
			: config.webpackConfig
		;
		const safeUserConfig = omit(
			userConfig,
			['output', 'styleguidist']
		);
		webpackConfig = merge(webpackConfig, safeUserConfig);
	}

	// Add JSON loader if user config has no one
	if (!hasJsonLoader(webpackConfig)) {
		webpackConfig.module.loaders.push({
			test: /\.json$/,
			loader: 'json-loader',
		});
	}

	// Add Styleguidist’s entry point after user’s entry points so things like polyfills would work
	webpackConfig.entry.push(path.resolve(sourceDir, 'index'));

	if (config.updateWebpackConfig) {
		webpackConfig = config.updateWebpackConfig(webpackConfig, env);
	}

	/* istanbul ignore if */
	if (config.verbose) {
		console.log();
		console.log('Using Webpack config:');
		console.log(prettyjson.render(webpackConfig));
		console.log();
	}

	return webpackConfig;
};
