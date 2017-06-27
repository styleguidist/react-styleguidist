'use strict';

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const merge = require('webpack-merge');
const makeWebpackConfig = require('./make-webpack-config');

module.exports = function createServer(config, env) {
	const webpackConfig = makeWebpackConfig(config, env);
	const webpackDevServerConfig = merge(webpackConfig.devServer, {
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

	const compiler = webpack(webpackConfig);
	const devServer = new WebpackDevServer(compiler, webpackDevServerConfig);

	// User defined customizations
	if (config.configureServer) {
		config.configureServer(devServer.app, env);
	}

	return { app: devServer, compiler };
};
