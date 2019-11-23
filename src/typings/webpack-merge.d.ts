declare module 'webpack-merge' {
	import { Tapable } from 'tapable';
	import { Configuration } from 'webpack';

	type MetaConfig = Configuration | ((env?: string) => Configuration);
	type mergeFunction = (config1: MetaConfig, config2: MetaConfig) => Configuration;
	type customizeArrayFuntion = () => any[];
	interface WebpackMergeOptions {
		customizeArray: customizeArrayFuntion;
	}
	const webpackMerge: {
		(options: WebpackMergeOptions): mergeFunction;
		unique(
			key: string,
			uniques: string[],
			getter?: (plugin: Tapable.Plugin) => string | undefined | false
		): customizeArrayFuntion;
	};
	export = webpackMerge;
}
