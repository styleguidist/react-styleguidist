module.exports = {
	title: 'React Style Guide Example',
	sections: [
		{
			name: 'Components',
			components: './lib/components/**/[A-Z]*.js',
		},
		{
			name: 'Documentation',
			sections: [
				{
					name: 'First File',
					content: 'docs/One.md',
				},
				{
					name: 'Second File',
					content: 'docs/Two.md',
				},
			],
		},
	],
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
