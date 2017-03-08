# Configuring webpack

Styleguidist uses [webpack](https://webpack.js.org/) under the hood and it needs to know how to load your project’s files.

*Webpack is a peer dependency but your project doesn’t have to use it. React Styleguidist works with webpack 1 and webpack 2.*

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

> **Note:** `entry`, `externals`, `output`, `watch`, `stats` and `devtool` options will be ignored.

> **Warning:** This option disables webpack config file autoload, see above how to load your config manually.

> **Note:** `CommonsChunkPlugins`, `HtmlWebpackPlugin`, `UglifyJsPlugin`, `HotModuleReplacementPlugin` plugins will be ignored because Styleguidist already includes them or they may break Styleguidist.

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
