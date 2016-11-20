'use strict';

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const makeWebpackConfig = require('./make-webpack-config');

module.exports = function server(config, callback) {
	const webpackConfig = makeWebpackConfig(config, 'development');
	const compiler = webpack(webpackConfig);

	const devServer = new WebpackDevServer(compiler, {
		compress: true,
		clientLogLevel: 'none',
		hot: true,
		quiet: true,
		watchOptions: {
			ignored: /node_modules/,
		},
		contentBase: config.assetsDir,
		stats: webpackConfig.stats,
	});

	devServer.listen(config.serverPort, config.serverHost, callback);

	return compiler;
};
