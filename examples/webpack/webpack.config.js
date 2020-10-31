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
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
						},
					},
				],
			},
			{
				test: /\.svg$/,
				loader: 'file-loader',
				options: {
					name: 'static/media/[name].[hash:8].[ext]',
				},
			},
		],
	},
};
