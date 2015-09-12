var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var AdvancedVariables = require('postcss-advanced-variables');
var config = require('../src/utils/config');

var includes = [
	__dirname,
	config.rootDir
];
var codeMirrorPath = path.join(__dirname, '../node_modules/react-codemirror/node_modules/codemirror');

var webpackConfig = {
	entry: [
		'webpack-hot-middleware/client',
		'./src/index'
	],
	devtool: 'eval-source-map',
	output: {
		path: __dirname,
		filename: 'bundle.js'
	},
	resolve: {
		root: [
			path.join(__dirname)
		],
		alias: {
			'codemirror': codeMirrorPath
		}
	},
	resolveLoader: {
		modulesDirectories: [
			'loaders',
			'node_modules'
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new HtmlWebpackPlugin({
			title: config.title,
			template: './src/templates/index.html',
			inject: true
		})
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				include: includes,
				loader: 'babel'
			},
			{
				test: /\.css$/,
				include: includes,
				loader: 'style!css?modules!postcss'
			},
			{
				test: /\.css$/,
				include: codeMirrorPath,
				loader: 'style!css'
			}
		]
	},
    postcss: function() {
        return [
            AdvancedVariables
        ];
    }
};

if (config.updateWebpackConfig) {
	webpackConfig = config.updateWebpackConfig(webpackConfig);
}

module.exports = webpackConfig;
