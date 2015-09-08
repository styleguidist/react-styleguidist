var path = require('path');
var webpack = require('webpack');
var AdvancedVariables = require('postcss-advanced-variables');

var includes = [
	__dirname,
	path.join(__dirname, '../example') // TODO: config
];

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
		root: [
			path.join(__dirname)
		],
		alias: {
			// 'components': path.join(__dirname, 'components'),
			'codemirror': path.join(__dirname, '../node_modules/react-codemirror/node_modules/codemirror')
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
		new webpack.NoErrorsPlugin()
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
			}
		]
	},
    postcss: function() {
        return [
            AdvancedVariables
        ];
    }
};
