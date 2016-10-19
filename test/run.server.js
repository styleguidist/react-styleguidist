const path = require('path');
const styleguidist = require('../scripts');

/* eslint-disable no-console */

styleguidist({
	components: './components/**/[A-Z]*.js',
	updateWebpackConfig(webpackConfig) {
		const dir = path.resolve(__dirname, '../examples/basic/lib');
		webpackConfig.module.loaders.push(
			{
				test: /\.jsx?$/,
				include: dir,
				loader: 'babel',
			},
			{
				test: /\.css$/,
				include: dir,
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
}).server((err, config) => {
	if (err) {
		console.log(err);
	}
	else {
		console.log('Listening at http://' + config.serverHost + ':' + config.serverPort);
	}
});
