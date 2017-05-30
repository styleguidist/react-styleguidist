const path = require('path');
const loaders = require('loaders');

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
	styles: {
		Playground: {
			root: {
				borderRadius: 0,
				borderWidth: [[0, 0, 1, 0]],
			},
			preview: {
				paddingLeft: 0,
				paddingRight: 0,
			},
			codeToggle: {
				marginTop: 1,
				border: 0,
			},
			hideCode: {
				background: 'none',
			},
		},
		Markdown: {
			pre: {
				border: 0,
				background: 'none',
			},
			code: {
				fontSize: 14,
			},
		},
	},
	getComponentPathLine(componentPath) {
		const name = path.basename(componentPath, '.js');
		return `import { ${name} } from 'my-awesome-library';`;
	},
	webpackConfig: {
		resolve: {
			alias: {
				// Override Styleguidist components
				'rsg-components/Logo': path.join(__dirname, 'styleguide/components/Logo'),
				'rsg-components/StyleGuide/StyleGuideRenderer': path.join(
					__dirname,
					'styleguide/components/StyleGuide'
				),
			},
		},
		module: {
			loaders: [
				loaders.babel,
				loaders.url,
				{
					test: /\.css$/,
					loader: 'style-loader!css-loader?modules',
				},
			],
		},
	},
};
