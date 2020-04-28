import { Tapable } from 'tapable';
// @ts-ignore
import { Compiler, compilation, NormalModule } from 'webpack';
import * as Rsg from '../../typings';

// Webpack plugin that makes Styleguidist config available for Styleguidist webpack loaders.
// It will be available as `this._styleguidist`.
//
// Other working in webpack 2 way is to use LoaderOptionsPlugin, but it has problems.
// See this issue for details: https://github.com/styleguidist/react-styleguidist/issues/328

export default class StyleguidistOptionsPlugin implements Tapable.Plugin {
	private options: Rsg.SanitizedStyleguidistConfig;
	public constructor(options: Rsg.SanitizedStyleguidistConfig) {
		this.options = options;
		this.plugin = this.plugin.bind(this);
	}

	public plugin(compil: compilation.Compilation) {
		const pluginFunc = (context: Rsg.StyleguidistLoaderContext, module: { resource?: boolean }) => {
			if (!module.resource) {
				return;
			}
			context._styleguidist = this.options;
		};

		if (NormalModule && NormalModule.getCompilationHooks) {
			NormalModule.getCompilationHooks(compil).loader.tap('StyleguidistOptionsPlugin', pluginFunc);
		} else {
			compil.hooks.normalModuleLoader.tap('StyleguidistOptionsPlugin', pluginFunc);
		}
	}

	public apply(compiler: Compiler) {
		compiler.hooks.compilation.tap('StyleguidistOptionsPlugin', this.plugin);
	}
}
