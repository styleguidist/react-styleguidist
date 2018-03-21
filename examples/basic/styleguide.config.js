module.exports = {
	components: 'src/components/**/[A-Z]*.js',
	defaultExample: true,
	ribbon: {
		url: 'https://github.com/styleguidist/react-styleguidist',
	},
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
