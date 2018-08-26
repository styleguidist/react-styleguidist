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
		compilation.plugin('normal-module-loader', (context, module) => {
			if (!module.resource) {
				return;
			}
			context._styleguidist = this.options;
		});
	}

	apply(compiler) {
		if (compiler.hooks) {
			// Webpack 4
			compiler.hooks.compilation.tap('StyleguidistOptionsPlugin', this.plugin);
		} else {
			// Webpack 3
			compiler.plugin('compilation', this.plugin);
		}
	}
}

module.exports = StyleguidistOptionsPlugin;
