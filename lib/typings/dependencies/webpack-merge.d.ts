/// <reference types="webpack" />
/// <reference types="webpack-dev-server" />
declare module 'webpack-merge' {
    import { Tapable } from 'tapable';
    import { Configuration } from 'webpack';
    type MetaConfig = Configuration | ((env?: string) => Configuration);
    type mergeFunction = (...configs: MetaConfig[]) => Configuration;
    type customizeArrayFuntion = () => any[];
    interface WebpackMergeOptions {
        customizeArray: customizeArrayFuntion;
    }
    const webpackMerge: {
        (options: WebpackMergeOptions): mergeFunction;
        (...configs: MetaConfig[]): Configuration;
        unique(key: string, uniques: string[], getter?: (plugin: Tapable.Plugin) => string | undefined | false): customizeArrayFuntion;
    };
    export = webpackMerge;
}
