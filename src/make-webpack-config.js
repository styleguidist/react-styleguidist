var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var Initial = require('postcss-initial');
var merge = require('webpack-merge');
var prettyjson = require('prettyjson');
var config = require('../src/utils/config');

function getPackagePath(packageName) {
	return path.dirname(require.resolve(packageName + '/package.json'));
}

module.exports = function(env) {
	var isProd = env === 'production';
	var cssLoader = 'css?modules&importLoaders=1&localIdentName=ReactStyleguidist-[name]__[local]!postcss';

	var codeMirrorPath = getPackagePath('codemirror');
	var reactTransformPath = getPackagePath('babel-plugin-react-transform');

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
				new webpack.optimize.OccurenceOrderPlugin(),
				new webpack.optimize.DedupePlugin(),
				new webpack.optimize.UglifyJsPlugin({
					compress: {
						warnings: false
					},
					output: {
						comments: false
					},
					mangle: false
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
