import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import * as Rsg from '../typings';
export default function server(config: Rsg.SanitizedStyleguidistConfig, callback: (error?: Error) => void): {
    app: WebpackDevServer;
    compiler: webpack.Compiler;
};
