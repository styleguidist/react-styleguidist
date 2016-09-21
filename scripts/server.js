'use strict';

const express = require('express');
const webpack = require('webpack');
const makeWebpackConfig = require('./make-webpack-config');

module.exports = function server(config, callback) {
	const app = express();
	const webpackConfig = makeWebpackConfig(config, 'development');
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

	app.listen(config.serverPort, config.serverHost, callback);

	return compiler;
};
