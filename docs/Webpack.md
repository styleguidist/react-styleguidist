# Configuring webpack

Styleguidist uses [webpack](https://webpack.js.org/) under the hood and it needs to know how to load your project’s files.

_Webpack is required to run Styleguidist but your project doesn’t have to use it._

> **Note:** See [cookbook](Cookbook.md) for more examples.

<!-- To update run: npx markdown-toc --maxdepth 2 -i docs/Webpack.md -->

<!-- toc -->

- [Reusing your project’s webpack config](#reusing-your-projects-webpack-config)
- [Custom webpack config](#custom-webpack-config)
- [Create React App](#create-react-app)
- [Create React App with TypeScript](#create-react-app-with-typescript)
- [Non-webpack projects](#non-webpack-projects)
- [When nothing else works](#when-nothing-else-works)

<!-- tocstop -->

## Reusing your project’s webpack config

By default Styleguidist will try to find `webpack.config.js` in your project’s root directory and use it.

If your webpack config is located somewhere else, you need to load it manually:

```javascript
module.exports = {
  webpackConfig: require('./configs/webpack.js')
}
```

Or, merge it with other options:

```javascript
module.exports = {
  webpackConfig: Object.assign({}, require('./configs/webpack.js'), {
    /* Custom config options */
  })
}
```

> **Note:** `entry`, `externals`, `output`, `watch`, and `stats` options will be ignored. For production builds, `devtool` will also be ignored.

> **Note:** `CommonsChunkPlugins`, `HtmlWebpackPlugin`, `MiniHtmlWebpackPlugin`, `UglifyJsPlugin`, `HotModuleReplacementPlugin` plugins will be ignored because Styleguidist already includes them or they may break Styleguidist.

> **Note:** If your loaders don’t work with Styleguidist try to make `include` and `exclude` absolute paths.

> **Note:** Babelified webpack configs (like `webpack.config.babel.js`) are not supported. We recommend to convert your config to native Node — Node 6 supports [many ES6 features](http://node.green/).

> **Note:** Use [webpack-merge](https://github.com/survivejs/webpack-merge) for easier config merging.

## Custom webpack config

Add a `webpackConfig` section to your `styleguide.config.js`:

```javascript
module.exports = {
  webpackConfig: {
    module: {
      rules: [
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
}
```

> **Warning:** This option disables config load from `webpack.config.js`, see above how to load your config manually.

> **Note:** `entry`, `externals`, `output`, `watch`, and `stats` options will be ignored. For production builds, `devtool` will also be ignored.

> **Note:** `CommonsChunkPlugins`, `HtmlWebpackPlugin`, `MiniHtmlWebpackPlugin`, `UglifyJsPlugin`, `HotModuleReplacementPlugin` plugins will be ignored because Styleguidist already includes them or they may break Styleguidist.

## Create React App

[Create React App](https://github.com/facebook/create-react-app) is supported out of the box, you don’t even need to create a style guide config if your components could be found using a default pattern: all files with `.js` or `.jsx` extensions inside `src/components` or `src/Components` folders.

## Create React App with TypeScript

If you’re using [Create React App](https://github.com/facebook/create-react-app) and TypeScript:

1.  Install [react-docgen-typescript](https://github.com/styleguidist/react-docgen-typescript).
2.  Create a `styleguide.config.js`, see [configuration](Configuration.md) reference.
3.  Update your `styleguide.config.js`:

    ```javascript
    module.exports = {
      propsParser: require('react-docgen-typescript').parse,
      webpackConfig: require('react-scripts-ts/config/webpack.config.dev')
    }
    ```

## Non-webpack projects

If your project doesn’t use webpack you still need loaders for your files. You can use [webpack-blocks](https://github.com/andywer/webpack-blocks).

```bash
npm install --save-dev webpack-blocks
```

Then add a `webpackConfig` section to your `styleguide.config.js`:

```javascript
const { createConfig, babel, postcss } = require('webpack-blocks')
module.exports = {
  webpackConfig: createConfig([babel(), postcss()])
}
```

> **Note:** `.babelrc` and `postcss.config.js` files will be taken into account if you have them.

## When nothing else works

In very rare cases, like using legacy or third-party libraries, you may need to change webpack options that Styleguidist doesn’t allow you to change via `webpackConfig` options. In this case you can use [dangerouslyUpdateWebpackConfig](Configuration.md#dangerouslyupdatewebpackconfig) option.

> **Warning:** You may easily break Styleguidist using this option, use it at your own risk.
