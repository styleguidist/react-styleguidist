'use strict';

/* eslint-disable no-console */

const path = require('path');
const webpack = require('webpack');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const merge = require('webpack-merge');
const hasJsonLoader = require('./utils/hasJsonLoader');
const getWebpackVersion = require('./utils/getWebpackVersion');
const mergeWebpackConfig = require('./utils/mergeWebpackConfig');
const getStyleguide = require('../loaders/utils/getStyleguide');
const StyleguidistOptionsPlugin = require('./utils/StyleguidistOptionsPlugin');

const isWebpack2 = getWebpackVersion() === 2;
const sourceDir = path.resolve(__dirname, '../lib');

module.exports = function(config, env) {
	process.env.NODE_ENV = env;

	const isProd = env === 'production';

	let webpackConfig = {
		entry: {
			main: [],
			server: path.join(__dirname, 'render.js'), // Entry point for static rendering
		},
		output: {
			path: config.styleguideDir,
			filename: 'build/[name].js',
			chunkFilename: 'build/[name].js',
			libraryTarget: 'umd', // Required for the static rendering
		},
		resolve: {
			extensions: isWebpack2 ? ['.js', '.jsx', '.json'] : ['.js', '.jsx', '.json', ''],
			alias: {
				'rsg-codemirror-theme.css': `codemirror/theme/${config.highlightTheme}.css`,
			},
		},
		plugins: [
			new StyleguidistOptionsPlugin(config),
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify(env),
				},
			}),
			// Use separate entry point `server` for static HTML
			new StaticSiteGeneratorPlugin('server', ['/'], {
				config,
				styleguide: isProd && getStyleguide(config),
			}, {
				// Mock window global
				window: {
					navigator: {
						userAgent: 'node',
					},
				},
			}),
		],
		performance: {
			hints: false,
		},
	};

	if (isProd) {
		webpackConfig = merge(webpackConfig, {
			devtool: false,
			cache: false,
			plugins: [
				// Do not handle CSS loading when building static HTML
				new webpack.NormalModuleReplacementPlugin(/\.css$/, 'node-noop'),
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
			entry: {
				main: [
					require.resolve('react-dev-utils/webpackHotDevClient'),
				],
			},
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

	// Add Styleguidist’s entry point after user’s entry points so things like polyfills would work
	webpackConfig.entry.main.push(path.resolve(sourceDir, 'index'));

	// Add components folder alias at the end so users can override our components to customize the style guide
	// (their aliases should be before this one)
	webpackConfig.resolve.alias['rsg-components'] = path.resolve(sourceDir, 'rsg-components');

	if (config.updateWebpackConfig) {
		webpackConfig = config.updateWebpackConfig(webpackConfig, env);
	}

	return webpackConfig;
};
