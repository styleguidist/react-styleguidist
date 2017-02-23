'use strict';

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const makeWebpackConfig = require('./make-webpack-config');

module.exports = function createServer(config, env) {
	const webpackConfig = makeWebpackConfig(config, env);
	const compiler = webpack([
		makeWebpackConfig(config, env, true),
		webpackConfig,
	]);

	const devServer = new WebpackDevServer(compiler, {
		noInfo: true,
		compress: true,
		clientLogLevel: 'none',
		hot: true,
		quiet: true,
		watchOptions: {
			ignored: /node_modules/,
		},
		contentBase: config.assetsDir,
		stats: webpackConfig.stats || {},
	});

	// User defined customizations
	if (config.configureServer) {
		config.configureServer(devServer.app, env);
	}

	return { app: devServer, compiler };
};
