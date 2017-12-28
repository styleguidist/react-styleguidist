module.exports = {
	title: "Styleguide",
	components: 'src/app/**/[A-Z]*.js',
	defaultExample: true,
	groups: {
		core: {
			title: 'CORE',
			pathRegExp: /core/,
			description: 'CORE components'
		},
		default: {
			title: 'default',
			pathRegExp: /^((?!(core)).)*$/,
			description: 'DEFAULT components'
		}
	},
	groupsOptions: {
		defaultGroup: 'core'
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
