const path = require('path');
const loaders = require('loaders');
const reactDocgen = require('react-docgen');
const doctrine = require('doctrine');

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
	propsParser(filePath, source, resolver, handlers) {
		const components = reactDocgen.parse(source, resolver, handlers);
		const componentsWithTags = components.map((component) => {
			if (component.props) {
				Object.keys(component.props).forEach((propName) => {
					const prop = component.props[propName];
					const doclet = doctrine.parse(prop.description);
					component.props[propName].description = doclet.description;
					const tags = doclet.tags.reduce((allTags, tag) => {
						const title = tag.title;
						if (allTags[title]) {
							delete tag.title;
							allTags[title] = allTags[title].concat([tag]);
						}
						else {
							delete tag.title;
							allTags[title] = [tag];
						}
						return allTags;
					}, {});

					component.props[propName].tags = tags;
				});
			}
			return component;
		});
		return componentsWithTags;
	},
	webpackConfig: {
		resolve: {
			alias: {
				// Override Styleguidist components
				'rsg-components/Logo':
					path.join(__dirname, 'styleguide/components/Logo'),
				'rsg-components/StyleGuide/StyleGuideRenderer':
					path.join(__dirname, 'styleguide/components/StyleGuide'),
				'rsg-components/Props': path.join(__dirname, 'styleguide/components/PropsRenderer'),
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
