const path = require('path');
const glob = require('glob');
const styleguidist = require('../scripts');

/* eslint-disable no-console */

styleguidist({
	components() {
		return glob.sync(path.resolve(__dirname, '../examples/basic/lib/components/**/*.js'))
			.filter(module => /\/[A-Z]\w*\.js$/.test(module))
		;
	},
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
