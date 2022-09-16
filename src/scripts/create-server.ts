import webpack from 'webpack';
import WebpackDevServer, { Configuration } from 'webpack-dev-server';
import makeWebpackConfig from './make-webpack-config';
import * as Rsg from '../typings';

export default function createServer(
	config: Rsg.SanitizedStyleguidistConfig,
	env: 'development' | 'production' | 'none'
): { app: WebpackDevServer; compiler: webpack.Compiler } {
	const webpackConfig = makeWebpackConfig(config, env);

	const baseConfig: Partial<Configuration> = {
		host: config.serverHost,
		port: config.serverPort,
		compress: true,
		hot: true,
		client: {
			logging: 'none',
		},
		static: Array.isArray(config.assetsDir)
			? config.assetsDir.map((assetsDir) => ({
					directory: assetsDir,
					watch: true,
					publicPath: '/',
			  }))
			: {
					directory: config.assetsDir,
					watch: true,
					publicPath: '/',
			  },
		devMiddleware: {
			stats: webpackConfig.stats || {},
		},
	};

	const webpackDevServerConfig: Configuration = {
		...webpackConfig.devServer,
		...baseConfig,
		client: {
			...webpackConfig.devServer.client,
			...baseConfig.client,
		},
	};

	const compiler = webpack(webpackConfig);
	const devServer = new WebpackDevServer(webpackDevServerConfig, compiler);

	// User defined customizations
	if (config.configureServer) {
		config.configureServer((devServer as any).app, env);
	}

	return { app: devServer, compiler };
}
