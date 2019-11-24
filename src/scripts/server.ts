import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import createServer from './create-server';

export default function server(
	config: Rsg.StyleguidistConfig,
	callback: (error?: Error) => void
): { app: WebpackDevServer; compiler: webpack.Compiler } {
	const env = 'development';
	const serverInfo = createServer(config, env);

	serverInfo.app.listen(config.serverPort, config.serverHost, callback);

	return serverInfo;
}
