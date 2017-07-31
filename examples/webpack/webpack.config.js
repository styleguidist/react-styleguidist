const path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'build'),
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				include: path.resolve(__dirname, 'src'),
				loader: 'babel-loader',
				query: {
					presets: [['env', { targets: { node: 'current' } }], 'react'],
					plugins: ['transform-class-properties', 'transform-object-rest-spread'],
					babelrc: false,
				},
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader?importLoaders=1',
			},
			{
				test: /\.svg$/,
				loader: 'file-loader',
				query: {
					name: 'static/media/[name].[hash:8].[ext]',
				},
			},
		],
	},
};
