var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var Initial = require('postcss-initial');
var merge = require('webpack-merge');
var prettyjson = require('prettyjson');
var getInstalledPath = require('get-installed-path');
var config = require('../src/utils/config');

module.exports = function(env) {
	var isProd = env === 'production';
	var cssLoader = 'css?modules&importLoaders=1&localIdentName=ReactStyleguidist-[name]__[local]!postcss';

	var codeMirrorPath = getInstalledPath('codemirror', true);
	var reactTransformPath = getInstalledPath('babel-plugin-react-transform', true);

	var includes = [
		__dirname,
		config.rootDir
	];
	var webpackConfig = {
		output: {
			path: config.styleguideDir,
			filename: 'build/bundle.js'
		},
		resolve: {
			root: path.join(__dirname),
			extensions: ['', '.js', '.jsx'],
			modulesDirectories: [
				path.resolve(__dirname, '../node_modules'),
				'node_modules'
			],
			alias: {
				'codemirror': codeMirrorPath
			}
		},
		resolveLoader: {
			modulesDirectories: [
				path.resolve(__dirname, '../loaders'),
				path.resolve(__dirname, '../node_modules'),
				'node_modules'
			]
		},
		plugins: [
			new HtmlWebpackPlugin({
				title: config.title,
				template: config.template,
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
			],
			noParse: [
				/babel-core\/browser.js/
			]
		},
		postcss: function() {
			return [
				Initial({
					reset: 'inherited'
				})
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
						test: /\.jsx?$/,
						include: includes,
						loader: 'babel',
						query: {
							stage: 0
						}
					},
					{
						test: /\.json$/,
						loader: 'json'
					},
					{
						test: /\.css$/,
						include: codeMirrorPath,
						loader: ExtractTextPlugin.extract('style', 'css')
					},
					{
						test: /\.css$/,
						include: includes,
						loader: ExtractTextPlugin.extract('style', cssLoader)
					}
				]
			}
		});
	}
	else {
		webpackConfig = merge(webpackConfig, {
			entry: [
				'webpack-hot-middleware/client',
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
						test: /\.jsx?$/,
						include: includes,
						loader: 'babel',
						query: {
							stage: 0,
							plugins: [
								reactTransformPath
							],
							extra: {
								'react-transform': {
									transforms: [
										{
											transform: 'react-transform-hmr',
											imports: ['react'],
											locals: ['module']
										},
										{
											transform: 'react-transform-catch-errors',
											imports: ['react', 'redbox-react']
										}
									]
								}
							}
						}
					},
					{
						test: /\.json$/,
						loader: 'json'
					},
					{
						test: /\.css$/,
						include: codeMirrorPath,
						loader: 'style!css'
					},
					{
						test: /\.css$/,
						include: includes,
						loader: 'style!' + cssLoader
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
