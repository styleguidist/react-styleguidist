const path = require('path');

module.exports = {
	title: 'Style guide example',
	components: './src/components/**/[A-Z]*.js',
	showSidebar: false,
	theme: {
		baseBackground: '#fdfdfc',
		link: '#274e75',
		linkHover: '#90a7bf',
		border: '#e0d2de',
		font: ['Helvetica', 'sans-serif'],
	},
	styles: function styles(theme) {
		return {
			Playground: {
				preview: {
					paddingLeft: 0,
					paddingRight: 0,
					borderWidth: [[0, 0, 1, 0]],
					borderRadius: 0,
				},
			},
			Code: {
				code: {
					// make inline code example appear the same color as links
					color: theme.color.link,
					fontSize: 14,
				},
			},
		};
	},
	getComponentPathLine(componentPath) {
		const name = path.basename(componentPath, '.js');
		return `import { ${name} } from 'my-awesome-library';`;
	},

	// Example of overriding the CLI message in local development.
	// Uncomment/edit the following `serverHost` entry to see in output
	// serverHost: 'your-domain',
	printServerInstructions(config) {
		// eslint-disable-next-line no-console
		console.log(`View your styleguide at: http://${config.serverHost}:${config.serverPort}`);
	},

	// Override Styleguidist components
	styleguideComponents: {
		LogoRenderer: path.join(__dirname, 'styleguide/components/Logo'),
		StyleGuideRenderer: path.join(__dirname, 'styleguide/components/StyleGuide'),
		SectionsRenderer: path.join(__dirname, 'styleguide/components/SectionsRenderer'),
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
					use: [
						'style-loader',
						{
							loader: 'css-loader',
							options: {
								modules: true,
							},
						},
					],
				},
				{
					test: /\.svg$/,
					loader: 'url-loader',
				},
			],
		},
		resolve: {
			alias: {
				// Make sure the example uses the local version of react-styleguidist
				// This is only for the examples in this repo, you won't need it for your own project
				'react-styleguidist': path.join(__dirname, '../../'),
			},
		},
	},
};
