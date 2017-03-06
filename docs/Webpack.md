# Configuring webpack

Styleguidist uses [webpack](https://webpack.js.org/) under the hood and it needs to know how to load your project’s files.

*Webpack is a peer dependency but your project doesn’t have to use it. React Styleguidist works with webpack 1 and webpack 2.*

> **Note:** See [cookbook](Cookbook.md) for more examples.

## Reusing your project’s webpack config

By default Styleguidist will try to find `webpack.config.js` in your project’s root directory and use it.

If your webpack config is located somewhere else, add its location to your `styleguide.config.js`:

```javascript
module.exports = {
  webpackConfigFile: './configs/webpack.js'
};
```

> **Note:** It may not work with your project, see below for other options.

> **Note:** `entry`, `externals` and `output` options will be ignored, use `webpackConfig` option to change them.

> **Note:** These plugins will be ignored: `CommonsChunkPlugins`, `HtmlWebpackPlugin`, `OccurrenceOrderPlugin`, `DedupePlugin`, `UglifyJsPlugin`, `HotModuleReplacementPlugin`.

## Custom webpack config

Add a `webpackConfig` section to your `styleguide.config.js`:

```javascript
module.exports = {
  webpackConfig: {
    module: {
      loaders: [
        // Babel loader, will use your project’s .babelrc
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        // Other loaders that are needed for your components
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader?modules'
        }
      ]
    }
  }
};
```

> **Warning:** Using this option disables webpack config file autoload, use `webpackConfigFile` option to load your project’s webpack config from a file.

> **Note:** These plugins will be ignored: `CommonsChunkPlugins`, `HtmlWebpackPlugin`, `OccurrenceOrderPlugin`, `DedupePlugin`, `UglifyJsPlugin`, `HotModuleReplacementPlugin`.

## Non-webpack projects

If your project doesn’t use webpack you still need loaders for your files. You can use [webpack-blocks](https://github.com/andywer/webpack-blocks).

```bash
npm install --save-dev @webpack-blocks/webpack2 @webpack-blocks/babel6 @webpack-blocks/postcss
```

Then add a `webpackConfig` section to your `styleguide.config.js`:

```javascript
const { createConfig } = require('@webpack-blocks/webpack2');
const babel = require('@webpack-blocks/babel6');
const postcss = require('@webpack-blocks/postcss');
module.exports = {
	webpackConfig: createConfig([
		babel(),
		postcss()
	])
};
```

> **Note:** `.babelrc` and `postcss.config.js` files will be taken into account if you have them.

> **Note:** Use `@webpack-blocks/webpack` for webpack 1. See [webpack-blocks docs](https://github.com/andywer/webpack-blocks) for more options.
