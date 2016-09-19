const express = require('express');
const webpack = require('webpack');

const config = require('./../src/utils/config');
config.initialize(); // we need to initialize config before requiring anything else from the project

const makeWebpackConfig = require('./make-webpack-config');

module.exports = function server(callback) {
	const app = express();
	const webpackConfig = makeWebpackConfig('development');
	const stats = webpackConfig.stats || {};
	const compiler = webpack(webpackConfig);

	app.use(require('webpack-dev-middleware')(compiler, {
		noInfo: true,
		stats,
	}));

	app.use(require('webpack-hot-middleware')(compiler));

	if (config.assetsDir) {
		app.use(express.static(config.assetsDir));
	}

	app.listen(config.serverPort, config.serverHost, (err) => {
		callback(err, config);
	});
};
