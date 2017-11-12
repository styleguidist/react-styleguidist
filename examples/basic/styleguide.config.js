module.exports = {
	components: 'src/components/**/[A-Z]*.js',
	defaultExample: true,
	highlightTheme: 'material',
	webpackConfig: {
		module: {
			rules: [
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
				},
				{
					test: /\.css$/,
					loader: 'style-loader!css-loader',
				},
			],
		},
	},
};
