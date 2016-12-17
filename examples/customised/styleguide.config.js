const path = require('path');
const loaders = require('loaders');

module.exports = {
	title: 'Style guide example',
	components: './lib/components/**/[A-Z]*.js',
	webpackConfigFile: false,
	webpackConfig: {
		resolve: {
			alias: {
				// Supply your own renderers and styles below
				'rsg-components/StyleGuide/StyleGuideRenderer':
					path.join(__dirname, 'styleguide/components/StyleGuide'),
				'rsg-components/ReactComponent/ReactComponentRenderer':
					path.join(__dirname, 'styleguide/components/ReactComponent'),
			},
		},
		module: {
			loaders: [
				loaders.babel,
				{
					test: /\.css$/,
					loader: 'style-loader!css-loader?modules',
				},
			],
		},
	},
};
