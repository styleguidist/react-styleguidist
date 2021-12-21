import webpack from 'webpack';
import * as Rsg from '../typings';
export default function build(config: Rsg.SanitizedStyleguidistConfig, callback: (err: Error, stats: webpack.Stats) => void): webpack.Compiler.Watching | webpack.Compiler;
