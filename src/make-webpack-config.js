var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var merge = require('webpack-merge');
var prettyjson = require('prettyjson');
var config = require('../src/utils/config');

/**
 * Return npm package path.
 * In npm2 works only with packages required directly by this package.
 *
 * @param {string} packageName Package name.
 * @return {string}
 */
function getPackagePath(packageName) {
	// We resolve package.json because otherwise path.resolve returns main module path
	return path.dirname(require.resolve(packageName + '/package.json'));
}

function validateWebpackConfig(webpackConfig) {
	webpackConfig.module.loaders.forEach(function(loader) {
		if (!loader.include && !loader.exclude) {
			throw Error('Styleguidist: "include" option is missing for ' + loader.test + ' Webpack loader.');
		}
	});
}

module.exports = function(env) {
	process.env.NODE_ENV = process.env.BABEL_ENV = env;

	var codeMirrorPath = getPackagePath('codemirror');

	var webpackConfig = {
		output: {
			path: config.styleguideDir,
			filename: 'build/bundle.js'
		},
		resolve: {
			root: __dirname,
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
					// TODO: remove this when entities module is fixed (https://github.com/fb55/entities/pull/26)
					test: /node_modules[/\\]entities[/\\].*\.json$/,
					include: /node_modules/,
					loader: 'json'
				},
				{
					test: /\.css$/,
					include: [
						codeMirrorPath,
						getPackagePath('highlight.js')
					],
					loader: 'style!css'
				},
				{
					test: /\.css$/,
					include: __dirname,
					loader: 'style!css?modules&importLoaders=1&localIdentName=ReactStyleguidist-[name]__[local]'
				}
			],
			noParse: [
				/babel-standalone/
			]
		}
	};

	var entryScript = path.join(__dirname, 'index');

	if (env === 'production') {
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
						include: __dirname,
						loader: 'babel',
						query: {
							babelrc: false,
							presets: ['es2015', 'react', 'stage-0']
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
						include: __dirname,
						loader: 'babel',
						query: {
							babelrc: false,
							presets: ['es2015', 'react', 'stage-0', 'react-hmre']
						}
					}
				]
			}
		});
	}

	if (config.updateWebpackConfig) {
		webpackConfig = config.updateWebpackConfig(webpackConfig, env);
		validateWebpackConfig(webpackConfig);
	}

	if (config.verbose) {
		console.log();
		console.log('Using Webpack config:');
		console.log(prettyjson.render(webpackConfig));
		console.log();
	}

	return webpackConfig;
};
