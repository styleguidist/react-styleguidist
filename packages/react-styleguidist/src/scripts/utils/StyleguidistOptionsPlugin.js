// Webpack plugin that makes Styleguidist config available for Styleguidist webpack loaders.
// It will be available as `this._styleguidist`.
//
// Other working in webpack 2 way is to use LoaderOptionsPlugin, but it has problems.
// See this issue for details: https://github.com/styleguidist/react-styleguidist/issues/328

class StyleguidistOptionsPlugin {
	constructor(options) {
		this.options = options;
		this.plugin = this.plugin.bind(this);
	}

	plugin(compilation) {
		const pluginFunc = (context, module) => {
			if (!module.resource) {
				return;
			}
			context._styleguidist = this.options;
		};
		compilation.hooks.normalModuleLoader.tap('StyleguidistOptionsPlugin', pluginFunc);
	}

	apply(compiler) {
		compiler.hooks.compilation.tap('StyleguidistOptionsPlugin', this.plugin);
	}
}

module.exports = StyleguidistOptionsPlugin;
