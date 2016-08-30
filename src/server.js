/* eslint-disable no-var */

var express = require('express');
var webpack = require('webpack');

var config = require('./utils/config');
config.initialize(); // we need to initialize config before requiring anything else from the project

var makeWebpackConfig = require('./make-webpack-config');

module.exports = function server(callback) {
	var app = express();
	var webpackConfig = makeWebpackConfig('development');
	var stats = webpackConfig.stats || {};
	var compiler = webpack(webpackConfig);

	app.use(require('webpack-dev-middleware')(compiler, {
		noInfo: true,
		stats,
	}));

	app.use(require('webpack-hot-middleware')(compiler));

	if (config.assetsDir) {
		app.use(express.static(config.assetsDir));
	}

	app.listen(config.serverPort, config.serverHost, function(err) {
		callback(err, config);
	});
};
