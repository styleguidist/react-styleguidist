import path from 'path';
import castArray from 'lodash/castArray';
import forEach from 'lodash/forEach';
import isFunction from 'lodash/isFunction';
import webpack, { Configuration } from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import MiniHtmlWebpackPlugin from 'mini-html-webpack-plugin';
import MiniHtmlWebpackTemplate from '@vxna/mini-html-webpack-template';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import merge from 'webpack-merge';

import StyleguidistOptionsPlugin from '../utils/StyleguidistOptionsPlugin';
import mergeWebpackConfig from '../utils/mergeWebpackConfig';

const RENDERER_REGEXP = /Renderer$/;

const sourceDir = path.resolve(__dirname, '../../client');

const getCustomAliases = (styleguideComponents: Record<string, string>) => {
	const customAliases: Record<string, string> = {};
	forEach(styleguideComponents, (filepath, name) => {
		const fullName = name.match(RENDERER_REGEXP)
			? `${name.replace(RENDERER_REGEXP, '')}/${name}`
			: name;
		customAliases[`rsg-components/${fullName}`] = filepath;
	});
	return customAliases;
};

export default function(
	config: Rsg.SanitizedStyleguidistConfig,
	env: 'development' | 'production' | 'none'
): Configuration {
	process.env.NODE_ENV = process.env.NODE_ENV || env;

	const isProd = env === 'production';

	const template = isFunction(config.template) ? config.template : MiniHtmlWebpackTemplate;
	const templateContext = isFunction(config.template) ? {} : config.template;
	const htmlPluginOptions = {
		context: {
			...templateContext,
			title: config.title,
			container: config.mountPointId,
		},
		template,
	};

	let webpackConfig: Configuration = {
		name: 'ui',
		entry: config.require.concat([path.resolve(sourceDir, 'index')]),
		mode: env,
		output: {
			path: config.styleguideDir,
			filename: 'build/ui/[name].bundle.js',
			chunkFilename: 'build/ui/[name].js',
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
		module: {
			rules: [
				{
					// Support .mjs modules in dependencies, like sucrase
					test: /\.mjs$/,
					include: /node_modules/,
					type: 'javascript/auto',
				},
			],
		},
		performance: {
			hints: false,
		},
	};

	if (isProd) {
		const minimizer = new TerserPlugin({
			/* eslint-disable @typescript-eslint/camelcase */
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
			/* eslint-enable @typescript-eslint/camelcase */
		});
		webpackConfig = merge(webpackConfig, {
			output: {
				filename: 'build/ui/bundle.[chunkhash:8].js',
				chunkFilename: 'build/ui/[name].[chunkhash:8].js',
			},
			plugins: [
				new CleanWebpackPlugin({
					verbose: config.verbose === true,
				}),
			],
			optimization: {
				minimize: config.minimize === true,
				minimizer: [minimizer],
			},
		});
		webpackConfig = merge(webpackConfig, {
			plugins: [new CopyWebpackPlugin(castArray(config.assetsDir).map(from => ({ from })))],
		});
	} else {
		webpackConfig = merge(webpackConfig, {
			entry: [require.resolve('react-dev-utils/webpackHotDevClient')],
			plugins: [new webpack.HotModuleReplacementPlugin()],
		});
	}

	webpackConfig = mergeWebpackConfig(webpackConfig, config.webpackConfig, env);

	// Aliases
	webpackConfig = merge(webpackConfig, {
		resolve: {
			alias: {
				// In a sanitized config, moduleAliases is always an object (never null or undefined)
				...config.moduleAliases,
				// Custom styleguide components
				...getCustomAliases(config.styleguideComponents),
				// Code compiler module
				'rsg-compiler': config.compiler,
				// Add components folder alias at the end, so users can override our components
				// to customize the style guide (their aliases should be before this one)
				'rsg-components': path.resolve(sourceDir, 'rsg-components'),
			},
		},
	});

	webpackConfig = config.dangerouslyUpdateWebpackConfig(webpackConfig, env);

	return webpackConfig;
}
