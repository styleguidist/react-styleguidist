const path = require('path');

module.exports = {
	title: 'Style guide example',
	components: './lib/components/**/[A-Z]*.js',
	updateWebpackConfig(webpackConfig) {
		const dirs = [
			path.resolve(__dirname, 'lib'),
			path.resolve(__dirname, 'styleguide'),
		];

		// Supply your own renderers and styles below
		webpackConfig.resolve.alias['rsg-components/StyleGuide/StyleGuideRenderer'] =
			path.join(__dirname, 'styleguide/components/StyleGuide');
		webpackConfig.resolve.alias['rsg-components/ReactComponent/ReactComponentRenderer'] =
			path.join(__dirname, 'styleguide/components/ReactComponent');

		webpackConfig.module.loaders.push(
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
			}
		);

		return webpackConfig;
	},
};
