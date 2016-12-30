const path = require('path');

module.exports = {
	title: 'Style guide example',
	components: './lib/components/**/[A-Z]*.js',
	updateWebpackConfig(webpackConfig) {
		const dirs = [
			path.resolve(__dirname, 'lib'),
		];

		webpackConfig.devtool = 'source-map';

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
			}
		);

		return webpackConfig;
	},

	configureServer(app) {
		app.get('/custom', (req, res) => {
			res.status(200).send({ response: 'Server invoked' });
		});
	},
};
