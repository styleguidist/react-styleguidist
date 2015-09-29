var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var AdvancedVariables = require('postcss-advanced-variables');
var merge = require('webpack-merge');
var prettyjson = require('prettyjson');
var config = require('../src/utils/config');

module.exports = function(env) {
	var isProd = env === 'production';

	var includes = [
		__dirname,
		config.rootDir
	];
	var codeMirrorPath = path.join(__dirname, '../node_modules/react-codemirror/node_modules/codemirror');
	var webpackConfig = {
		output: {
			path: config.styleguideDir,
			filename: 'build/bundle.js'
		},
		resolve: {
			root: path.join(__dirname),
			alias: {
				'codemirror': codeMirrorPath
			}
		},
		resolveLoader: {
			modulesDirectories: [
				path.resolve(__dirname, '../loaders'),
				path.resolve(__dirname, '../node_modules')
			]
		},
		plugins: [
			new HtmlWebpackPlugin({
				title: config.title,
				template: './src/templates/index.html',
				inject: true
			}),
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify(env)
				}
			})
		],
		module: {
			loaders: [
				{
					test: /\.js$/,
					include: includes,
					loader: 'babel'
				}
			]
		},
		postcss: function() {
			return [
				AdvancedVariables
			];
		}
	};

	var entryScript = path.join(__dirname, 'index');

	if (isProd) {
		webpackConfig = merge(webpackConfig, {
			entry: [
				entryScript
			],
			devtool: false,
			debug: false,
			cache: false,
			plugins: [
				new webpack.optimize.UglifyJsPlugin({
					compress: {
						warnings: false
					},
					output: {
						comments: false
					},
					mangle: false
				}),
				new webpack.optimize.DedupePlugin(),
				new ExtractTextPlugin('build/styles.css', {
					allChunks: true
				})
			],
			module: {
				loaders: [
					{
						test: /\.css$/,
						include: codeMirrorPath,
						loader: ExtractTextPlugin.extract('style', 'css')
					},
					{
						test: /\.css$/,
						include: includes,
						loader: ExtractTextPlugin.extract('style', 'css?modules&-minimize&importLoaders=1!postcss')
					}
				]
			}
		});
	}
	else {
		webpackConfig = merge(webpackConfig, {
			entry: [
				path.resolve(__dirname, '../node_modules/webpack-hot-middleware/client'),
				entryScript
			],
			debug: true,
			cache: true,
			devtool: 'eval-source-map',
			stats: {
				colors: true,
				reasons: true
			},
			plugins: [
				new webpack.optimize.OccurenceOrderPlugin(),
				new webpack.HotModuleReplacementPlugin(),
				new webpack.NoErrorsPlugin()
			],
			module: {
				loaders: [
					{
						test: /\.css$/,
						include: codeMirrorPath,
						loader: 'style!css'
					},
					{
						test: /\.css$/,
						include: includes,
						loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss'
					}
				]
			}
		});
	}

	if (config.updateWebpackConfig) {
		webpackConfig = config.updateWebpackConfig(webpackConfig, env);
	}

	if (config.verbose) {
		console.log();
		console.log('Using Webpack config:');
		console.log(prettyjson.render(webpackConfig));
		console.log();
	}

	return webpackConfig;
};
