module.exports = {
	title: 'React Style Guide Example',
	components: 'lib/components/**/[A-Z]*.js',
	defaultExample: true,
	webpackConfig: {
		module: {
			loaders: [
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
				},
				{
					test: /\.css$/,
					loader: 'style-loader!css-loader?modules',
				},
			],
		},
	},
};
