const path = require('path');

const dirs = [
	path.resolve(__dirname, 'lib'),
	path.resolve(__dirname, 'styleguide'),
];

module.exports = {
	title: 'Style guide example',
	components: './lib/components/**/[A-Z]*.js',
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
				{
					test: /\.jsx?$/,
					include: dirs,
					loader: 'babel',
				},
				{
					test: /\.css$/,
					include: dirs,
					loader: 'style!css?modules&importLoaders=1',
				},
				{
					test: /\.json$/,
					include: path.dirname(require.resolve('dog-names/package.json')),
					loader: 'json',
				},
			],
		},
	},
};
