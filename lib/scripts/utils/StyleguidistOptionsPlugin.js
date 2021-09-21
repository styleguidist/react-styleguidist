"use strict";

exports.__esModule = true;
exports.default = void 0;

var _webpack = _interopRequireDefault(require("webpack"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Webpack plugin that makes Styleguidist config available for Styleguidist webpack loaders.
// It will be available as `this._styleguidist`.
//
// Other working in webpack 2 way is to use LoaderOptionsPlugin, but it has problems.
// See this issue for details: https://github.com/styleguidist/react-styleguidist/issues/328
class StyleguidistOptionsPlugin {
  constructor(options) {
    _defineProperty(this, "options", void 0);

    _defineProperty(this, "pluginFunc", (context, module) => {
      if (!module.resource) {
        return;
      }

      context._styleguidist = this.options;
    });

    _defineProperty(this, "plugin", compil => {
      // Webpack 5

      /* istanbul ignore next */
      if ('NormalModule' in _webpack.default) {
        // @ts-ignore
        _webpack.default.NormalModule.getCompilationHooks(compil).loader.tap('StyleguidistOptionsPlugin', this.pluginFunc);

        return;
      } // Webpack 4


      compil.hooks.normalModuleLoader.tap('StyleguidistOptionsPlugin', this.pluginFunc);
    });

    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('StyleguidistOptionsPlugin', this.plugin);
  }

}

exports.default = StyleguidistOptionsPlugin;