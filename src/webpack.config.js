var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: [
		'webpack-hot-middleware/client',
		'./src/index'
	],
	devtool: 'eval-source-map',
	output: {
		path: __dirname,
		filename: 'bundle.js',
		publicPath: '/static/'
	},
	resolve: {
		alias: {
			'codemirror': path.join(__dirname, '../node_modules/react-codemirror/node_modules/codemirror')
		}
	},
	resolveLoader: {
		modulesDirectories: ["loaders", "node_modules"],
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],
	module: {
		loaders: [{
			test: /\.js$/,
			loaders: ['babel'],
			include: [
				path.join(__dirname),
				path.join(__dirname, '../example'), // TODO: config
			]
		}]
	}
};
