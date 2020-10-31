import webpack, { Compiler, WebpackPluginInstance } from 'webpack';

import * as Rsg from '../../typings';

// Webpack plugin that makes Styleguidist config available for Styleguidist webpack loaders.
// It will be available as `this._styleguidist`.
//
// Other working in webpack 2 way is to use LoaderOptionsPlugin, but it has problems.
// See this issue for details: https://github.com/styleguidist/react-styleguidist/issues/328

export default class StyleguidistOptionsPlugin implements WebpackPluginInstance {
	private options: Rsg.SanitizedStyleguidistConfig;

	public constructor(options: Rsg.SanitizedStyleguidistConfig) {
		this.options = options;
	}

	/**
	 *
	 * @param module was `loader.LoaderContext` in webpack 4, Webpack 5 has no type.
	 * This could be a bug: https://github.com/webpack/webpack/issues/11630
	 */
	private pluginFunc = (context: Rsg.StyleguidistLoaderContext, module: any) => {
		if (!module.resource) {
			return;
		}
		context._styleguidist = this.options;
	};

	/**
	 *
	 * @param compil webpack 4 `compilation.Compilation`, webpack 5 `Compilation`
	 */
	private plugin = (compil: any) => {
		// Webpack 5
		if ('NormalModule' in webpack) {
			// @ts-ignore
			webpack.NormalModule.getCompilationHooks(compil).loader.tap(
				'StyleguidistOptionsPlugin',
				this.pluginFunc as any
			);
			return;
		}
		// Webpack 4
		compil.hooks.normalModuleLoader.tap('StyleguidistOptionsPlugin', this.pluginFunc as any);
	};

	public apply(compiler: Compiler) {
		compiler.hooks.compilation.tap('StyleguidistOptionsPlugin', this.plugin);
	}
}
