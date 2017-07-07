# Configuring webpack

Styleguidist uses [webpack](https://webpack.js.org/) under the hood and it needs to know how to load your project’s files.

*Webpack is required to run Styleguidist but your project doesn’t have to use it.*

> **Note:** See [cookbook](Cookbook.md) for more examples.

## Reusing your project’s webpack config

By default Styleguidist will try to find `webpack.config.js` in your project’s root directory and use it.

If your webpack config is located somewhere else, you need to load it manually:

```javascript
module.exports = {
  webpackConfig: require('./configs/webpack.js')
};
```

Or if you want to merge it with other options:

```javascript
module.exports = {
  webpackConfig: Object.assign({},
    require('./configs/webpack.js'),
    {
      /* Custom config options */
    }
  )
};
```

> **Note:** `entry`, `externals`, `output`, `watch`, `stats` and `devtool` options will be ignored.

> **Note:** `CommonsChunkPlugins`, `HtmlWebpackPlugin`, `UglifyJsPlugin`, `HotModuleReplacementPlugin` plugins will be ignored because Styleguidist already includes them or they may break Styleguidist.

> **Note:** If your loaders don’t work with Styleguidist try to make `include` and `exclude` absolute paths.

> **Note:** Babelified webpack configs (like `webpack.config.babel.js`) are not supported. We recommend to convert your config to native Node — Node 6 supports [many ES6 features](http://node.green/).

> **Note:** Use [webpack-merge](https://github.com/survivejs/webpack-merge) for easier config merging.

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

> **Warning:** This option disables config load from `webpack.config.js`, see above how to load your config manually.

> **Note:** `entry`, `externals`, `output`, `watch`, `stats` and `devtool` options will be ignored.

> **Note:** `CommonsChunkPlugins`, `HtmlWebpackPlugin`, `UglifyJsPlugin`, `HotModuleReplacementPlugin` plugins will be ignored because Styleguidist already includes them or they may break Styleguidist.

## Create React App

[Create React App](https://github.com/facebookincubator/create-react-app) is supported out of the box, you don’t even need to create a style guide config if your components could be found using a default glob pattern, `src/components/**/*.{js,jsx}`.

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

## When nothing else works

In very rare cases, like using legacy or third-party libraries, you may need to change webpack options that Styleguidist doesn’t allow you to change via `webpackConfig` options. In this case you can use [dangerouslyUpdateWebpackConfig](Configuration.md#dangerouslyupdatewebpackconfig) option.

> **Warning:** You may easily break Styleguidist using this options, use it at your own risk.
