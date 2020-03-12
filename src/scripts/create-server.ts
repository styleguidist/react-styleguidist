import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import getWebpackConfigs from './webpack/root.webpack.config';
import * as Rsg from '../typings';

export default function createServer(
	config: Rsg.SanitizedStyleguidistConfig,
	env: 'development' | 'production' | 'none'
) {
	const [uiWebpackConfig, iframeWebpackConfig] = getWebpackConfigs(config, env);

	const webpackDevServerConfig: WebpackDevServer.Configuration = {
		noInfo: true,
		compress: true,
		clientLogLevel: 'none',
		hot: true,
		watchOptions: {
			ignored: /node_modules/,
		},
		watchContentBase: config.assetsDir !== undefined,
		stats: iframeWebpackConfig.stats,
		before: app => {
			// User defined customizations
			if (config.configureServer) {
				config.configureServer(app, env);
			}
		},
		...iframeWebpackConfig.devServer,
		contentBase: config.assetsDir,
	};

	const compiler = webpack([uiWebpackConfig, iframeWebpackConfig]);
	const app = new WebpackDevServer(compiler, webpackDevServerConfig);

	return { app, compiler };
}
