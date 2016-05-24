/* eslint-disable no-var */

var express = require('express');
var webpack = require('webpack');
var makeWebpackConfig = require('./make-webpack-config');
var config = require('./utils/config');

module.exports = function server(callback) {
	var app = express();
	var compiler = webpack(makeWebpackConfig('development'));

	app.use(require('webpack-dev-middleware')(compiler, {
		noInfo: true,
	}));

	app.use(require('webpack-hot-middleware')(compiler));

	if (config.assetsDir) {
		app.use(express.static(config.assetsDir));
	}

	app.listen(config.serverPort, config.serverHost, function(err) {
		callback(err, config);
	});
};
