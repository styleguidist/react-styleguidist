'use strict';

const express = require('express');
const webpack = require('webpack');
const makeWebpackConfig = require('./make-webpack-config');

module.exports = function createServer(config, env) {
	const webpackConfig = makeWebpackConfig(config, env);
	const compiler = webpack(webpackConfig);
	const app = express();

	// register webpack middlewares
	app.use(require('webpack-dev-middleware')(compiler, {
		noInfo: true,
		stats: webpackConfig.stats || {},
	}));

	app.use(require('webpack-hot-middleware')(compiler));

	// configure static assets
	if (config.assetsDir) {
		app.use(express.static(config.assetsDir));
	}

	// user defined customizations
	if (config.configureServer) {
		config.configureServer(app, env);
	}

	return { app, compiler };
};
