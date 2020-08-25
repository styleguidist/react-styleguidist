<!-- Configuring webpack #webpack -->

# Configuring webpack

Styleguidist uses [webpack](https://webpack.js.org/) under the hood and it needs to know how to load your project’s files.

_Webpack is required to run Styleguidist but your project doesn’t have to use it._

> **Note:** See [cookbook](Cookbook.md) for more examples.

## Reusing your project’s webpack config

By default, Styleguidist will try to find `webpack.config.js` in your project’s root directory and use it.

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

> **Caution:** `entry`, `externals`, `output`, `watch`, and `stats` options will be ignored. For production builds, `devtool` will also be ignored.

> **Caution:** `CommonsChunkPlugins`, `HtmlWebpackPlugin`, `MiniHtmlWebpackPlugin`, `UglifyJsPlugin`, `TerserPlugin`, `HotModuleReplacementPlugin` plugins will be ignored because Styleguidist already includes them or they may break Styleguidist.

> **Tip:** If your loaders don’t work with Styleguidist try to make `include` and `exclude` absolute paths.

> **Note:** Babelified webpack configs (like `webpack.config.babel.js`) are not supported. We recommend to convert your config to native Node — Node 6 supports [many ES6 features](http://node.green/).

> **Tip:** Use [webpack-merge](https://github.com/survivejs/webpack-merge) for easier config merging.

## Custom webpack config

Add a `webpackConfig` section to your `styleguide.config.js`:

```javascript
module.exports = {
  webpackConfig: {
    module: {
      rules: [
        // Babel loader will use your project’s babel.config.js
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        // Other loaders that are needed for your components
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    }
  }
}
```

> **Caution:** This option disables config load from `webpack.config.js`, see above how to load your config manually.

> **Caution:** `entry`, `externals`, `output`, `watch`, and `stats` options will be ignored. For production builds, `devtool` will also be ignored.

> **Caution:** `CommonsChunkPlugins`, `HtmlWebpackPlugin`, `MiniHtmlWebpackPlugin`, `UglifyJsPlugin`, `TerserPlugin`, `HotModuleReplacementPlugin` plugins will be ignored because Styleguidist already includes them or they may break Styleguidist.

## Create React App

[Create React App](https://github.com/facebook/create-react-app) is supported out of the box, you don’t even need to create a style guide config if your components could be found using a default pattern: all files with `.js` or `.jsx` extensions inside `src/components` or `src/Components` folders.

## Next.js

The [Next.js](https://nextjs.org/) framework abstracts away webpack for you, but it still uses webpack under the hood.

After configuring your webpack loaders in `styleguide.config.js` you will need to also configure Babel. First install all the required Babel dependencies:

```bash
npm install --save-dev babel-loader @babel/core @babel/preset-react
```

Next, you'll want to configure Babel to use the appropriate presets, here is an example `.babelrc` file:

```json
{
  "presets": ["@babel/preset-react"]
}
```

That's it, notice that we don't need to install webpack as it's already included by Next.js.

## Non-webpack projects

To use features, not supported by browsers, like JSX, you’ll need to compile your code with Babel or another tool.

Let’s configure Styleguidist with Babel.

> **Info:** Babel is not required for Styleguidist or React, but likely you’ll want to use it to run your code.

First, install the Babel webpack loader:

```bash
npm install --save-dev babel-loader
```

> **Caution:** If your project doesn’t use webpack you still need to add webpack loaders for your files, otherwise Styleguidist won’t be able to load your code.

Then, add a `webpackConfig` section to your `styleguide.config.js`

```js
module.exports = {
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }
      ]
    }
  }
}
```

or create a webpack config, `webpack.config.js`:

```js
module: {
  rules: [
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }
  ]
}
```

If you don’t have Babel in your project, you need to install it with two presets — [env](https://babeljs.io/docs/en/babel-preset-env) and [react](https://babeljs.io/docs/en/babel-preset-react):

```bash
npm install --save-dev @babel/core @babel/preset-env @babel/preset-react
```

And create a config file in your project’s root folder, `babel.config.js`:

```js
module.exports = {
  presets: [
    [
      '@babel/env',
      {
        modules: false,
        useBuiltIns: 'usage'
      }
    ],
    '@babel/react'
  ]
}
```

We also recommend to add a [browserslist](https://github.com/browserslist/browserslist) config to your `package.json` file like this:

```diff
+  "browserslist": [
+    ">1%",
+    "last 1 version",
+    "Firefox ESR",
+    "not dead"
+  ]
```

This will tell Babel (and some other tools) which browsers you support, so it won’t apply unnecessary transformations, making code smaller and faster.

## When nothing else works

In very rare cases, like using legacy or third-party libraries, you may need to change webpack options that Styleguidist doesn’t allow you to change via `webpackConfig` options. In this case, you can use [dangerouslyUpdateWebpackConfig](Configuration.md#dangerouslyupdatewebpackconfig) option.

> **Danger:** You may break Styleguidist using this option, use it at your own risk.
