import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import * as Rsg from '../typings';
export default function createServer(config: Rsg.SanitizedStyleguidistConfig, env: 'development' | 'production' | 'none'): {
    app: WebpackDevServer;
    compiler: webpack.Compiler;
};
