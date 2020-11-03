import { compilation, Compiler, WebpackPluginInstance, loader } from 'webpack';
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

	private pluginFunc = (context: Rsg.StyleguidistLoaderContext, module: loader.LoaderContext) => {
		if (!module.resource) {
			return;
		}
		context._styleguidist = this.options;
	};

	private plugin = (compil: compilation.Compilation) => {
		// FIXME: Find out how to type it properly
		compil.hooks.normalModuleLoader.tap('StyleguidistOptionsPlugin', this.pluginFunc as any);
	};

	public apply(compiler: Compiler) {
		compiler.hooks.compilation.tap('StyleguidistOptionsPlugin', this.plugin);
	}
}
