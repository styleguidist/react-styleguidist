const path = require('path');
const castArray = require('lodash/castArray');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const MiniHtmlWebpackPlugin = require('mini-html-webpack-plugin');
const MiniHtmlWebpackTemplate = require('@vxna/mini-html-webpack-template');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const forEach = require('lodash/forEach');
const isFunction = require('lodash/isFunction');
const mergeWebpackConfig = require('./utils/mergeWebpackConfig');
const StyleguidistOptionsPlugin = require('./utils/StyleguidistOptionsPlugin');

const RENDERER_REGEXP = /Renderer$/;

const sourceDir = path.resolve(__dirname, '../client');

module.exports = function(config, env) {
	process.env.NODE_ENV = process.env.NODE_ENV || env;

	const isProd = env === 'production';

	const template = isFunction(config.template) ? config.template : MiniHtmlWebpackTemplate;
	const templateContext = isFunction(config.template) ? {} : config.template;
	const htmlPluginOptions = {
		context: Object.assign({}, templateContext, {
			title: config.title,
			container: config.mountPointId,
			trimWhitespace: true,
		}),
		template,
	};

	let webpackConfig = {
		entry: config.require.concat([path.resolve(sourceDir, 'index')]),
		mode: env,
		output: {
			path: config.styleguideDir,
			filename: 'build/[name].bundle.js',
			chunkFilename: 'build/[name].js',
			publicPath: '',
		},
		resolve: {
			extensions: ['.wasm', '.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
			alias: {},
		},
		plugins: [
			new StyleguidistOptionsPlugin(config),
			new MiniHtmlWebpackPlugin(htmlPluginOptions),
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
				'process.env.STYLEGUIDIST_ENV': JSON.stringify(env),
			}),
		],
		performance: {
			hints: false,
		},
	};

	if (isProd) {
		const minimizer = new TerserPlugin({
			parallel: true,
			cache: true,
			terserOptions: {
				ie8: false,
				ecma: 5,
				compress: {
					keep_fnames: true,
					warnings: false,
					/*
					 * Disable reduce_funcs to keep Terser from inlining
					 * Preact's VNode. If enabled, the 'new VNode()' is replaced
					 * with a anonymous 'function(){}', which is problematic for
					 * preact-compat, since it extends the VNode prototype to
					 * accomodate React's API.
					 */
					reduce_funcs: false,
				},
				mangle: {
					keep_fnames: true,
				},
			},
		});
		webpackConfig = merge(webpackConfig, {
			output: {
				filename: 'build/bundle.[chunkhash:8].js',
				chunkFilename: 'build/[name].[chunkhash:8].js',
			},
			plugins: [
				new CleanWebpackPlugin(['build'], {
					root: config.styleguideDir,
					verbose: config.verbose === true,
				}),
				new CopyWebpackPlugin(
					config.assetsDir ? castArray(config.assetsDir).map(dir => ({ from: dir })) : []
				),
			],
			optimization: {
				minimizer: [minimizer],
			},
		});
	} else {
		webpackConfig = merge(webpackConfig, {
			entry: [require.resolve('react-dev-utils/webpackHotDevClient')],
			plugins: [new webpack.HotModuleReplacementPlugin()],
		});
	}

	if (config.webpackConfig) {
		webpackConfig = mergeWebpackConfig(webpackConfig, config.webpackConfig, env);
	}

	// Custom aliases
	if (config.moduleAliases) {
		webpackConfig = merge(webpackConfig, {
			resolve: { alias: config.moduleAliases },
		});
	}

	// Custom style guide components
	if (config.styleguideComponents) {
		forEach(config.styleguideComponents, (filepath, name) => {
			const fullName = name.match(RENDERER_REGEXP)
				? `${name.replace(RENDERER_REGEXP, '')}/${name}`
				: name;
			webpackConfig.resolve.alias[`rsg-components/${fullName}`] = filepath;
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
