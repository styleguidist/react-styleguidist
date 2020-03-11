import webpack, { Configuration } from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import merge from 'webpack-merge';
import makeWebpackConfig from './make-webpack-config';
import * as Rsg from '../typings';

export default function createServer(
	config: Rsg.SanitizedStyleguidistConfig,
	env: 'development' | 'production' | 'none'
): { app: WebpackDevServer; compiler: webpack.Compiler } {
	const webpackConfig = makeWebpackConfig(config, env);
	const webpackDevServerConfig = merge(
		{
			noInfo: true,
			compress: true,
			clientLogLevel: 'none',
			hot: true,
			quiet: true,
			watchOptions: {
				ignored: /node_modules/,
			},
			watchContentBase: config.assetsDir !== undefined,
			stats: webpackConfig.stats || {},
		} as Configuration,
		webpackConfig.devServer as Configuration,
		{
			contentBase: config.assetsDir,
		} as Configuration
	);

	const compiler = webpack(webpackConfig);
	const devServer = new WebpackDevServer(compiler, webpackDevServerConfig);

	// User defined customizations
	if (config.configureServer) {
		config.configureServer((devServer as any).app, env);
	}

	return { app: devServer, compiler };
}
