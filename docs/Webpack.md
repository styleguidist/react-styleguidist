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

> **Note:** `CommonsChunkPlugins`, `HtmlWebpackPlugin`, `MiniHtmlWebpackPlugin`, `UglifyJsPlugin`, `TerserPlugin`, `HotModuleReplacementPlugin` plugins will be ignored because Styleguidist already includes them or they may break Styleguidist.

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
        // Babel loader, will use your project’s babel.config.js
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

> **Warning:** This option disables config load from `webpack.config.js`, see above how to load your config manually.

> **Note:** `entry`, `externals`, `output`, `watch`, and `stats` options will be ignored. For production builds, `devtool` will also be ignored.

> **Note:** `CommonsChunkPlugins`, `HtmlWebpackPlugin`, `MiniHtmlWebpackPlugin`, `UglifyJsPlugin`, `TerserPlugin`, `HotModuleReplacementPlugin` plugins will be ignored because Styleguidist already includes them or they may break Styleguidist.

## Create React App

[Create React App](https://github.com/facebook/create-react-app) is supported out of the box, you don’t even need to create a style guide config if your components could be found using a default pattern: all files with `.js` or `.jsx` extensions inside `src/components` or `src/Components` folders.

## Create React App with TypeScript

If you’re using [Create React App](https://github.com/facebook/create-react-app) and TypeScript:

1. Install [react-docgen-typescript](https://github.com/styleguidist/react-docgen-typescript).
2. Create a `styleguide.config.js`, see [configuration](Configuration.md) reference.
3. Update your `styleguide.config.js`:

   ```javascript
   module.exports = {
     propsParser: require('react-docgen-typescript').withCustomConfig(
       './tsconfig.json'
     ).parse
   }
   ```

## Non-webpack projects

To use features, not supported by browsers, like JSX, you’ll need to compile your code with Babel or another tool.

Let’s configure Styleguidist with Babel.

> **Note:** Babel is not required for Styleguidist or React, but likely you’ll want to use it to run your code.

First, install the Babel webpack loader:

```bash
npm install --save-dev babel-loader
```

> **Note:** If your project doesn’t use webpack you still need add webpack loaders for your files, otherwise Styleguidist won’t be able to load your code.

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

In very rare cases, like using legacy or third-party libraries, you may need to change webpack options that Styleguidist doesn’t allow you to change via `webpackConfig` options. In this case you can use [dangerouslyUpdateWebpackConfig](Configuration.md#dangerouslyupdatewebpackconfig) option.

> **Warning:** You may easily break Styleguidist using this option, use it at your own risk.
