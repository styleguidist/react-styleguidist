module.exports = {
	components: 'src/app/**/[A-Z]*.js',
	defaultExample: true,
	groups: {
		core: {
			title: 'CORE',
			pathRegExp: /core/
		},
		default: {
			title: 'default',
			pathRegExp: /(?!(core))/,
		}
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
