declare module 'webpack-merge' {
	import { Configuration, WebpackPluginInstance } from 'webpack';

	type MetaConfig = Configuration | ((env?: string) => Configuration);
	type mergeFunction = (...configs: MetaConfig[]) => Configuration;
	type customizeArrayFuntion = () => any[];
	interface WebpackMergeOptions {
		customizeArray: customizeArrayFuntion;
	}
	const webpackMerge: {
		(options: WebpackMergeOptions): mergeFunction;
		(...configs: MetaConfig[]): Configuration;
		unique(
			key: string,
			uniques: string[],
			getter?: (plugin: WebpackPluginInstance) => string | undefined | false
		): customizeArrayFuntion;
	};
	export = webpackMerge;
}
