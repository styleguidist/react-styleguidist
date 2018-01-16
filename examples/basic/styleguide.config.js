const path = require('path');

module.exports = {
	dev: true,
	title: "Styleguide",
	components: 'src/app/**/[A-Z]*.js',
	defaultExample: true,
	useCustomScss: false,
	require: [
		// require global main.scss file
		path.join(__dirname, 'styles/core.scss'),
	],
	groups: {
		documentation: {
			title: 'Documentation',
			pathRegExp: /docs/,
			description: 'Documentation section',
			includeStatic: true
		},
		core: {
			title: 'Core components',
			pathRegExp: /core/,
			description: 'Core components section',
			includeStatic: false
		},
		default: {
			title: 'Components',
			pathRegExp: /^((?!(core)).)*$/,
			description: 'Components section',
			includeStatic: false
		}
	},
	groupsOptions: {
		defaultGroup: 'documentation'
	},
	sections: [
		{
			name: 'Introduction',
			content: 'docs/intro.md',
			static: true
		},
		{
			name: 'Documentation',
			static: true,
			sections: [
				{
					name: 'Installation',
					static: true,
					content: 'docs/install.md',
					description: 'The description for the installation section'
				},
				{
					name: 'Configuration',
					static: true,
					content: 'docs/config.md'
				}
			]
		},
		{
			name: 'Components',
			static: false,
			sections: [
				{
					name: 'UI',
					static: false,
					components: [
						'src/app/components/ui/**/[A-Z]*.js',
						'src/app/core/components/ui/**/[A-Z]*.js',
					]
				},
				{
					name: 'Others',
					static: false,
					components: [
						'src/app/components/others/**/[A-Z]*.js',
						'src/app/core/components/others/**/[A-Z]*.js',
					]
				},
			]
		}
	],
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
				{
					test: /\.scss$/,
					exclude: /node_modules/,
					use: [
						{
							loader: 'style-loader',
						},
						{
							loader: 'css-loader',
						},
						{
							loader: 'sass-loader',
						},
					],
				}
			],
		},
	},
};
