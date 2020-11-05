<!-- Node.js API #api -->

# Node.js API

## Initialization

First, you need to initialize the API for your style guide config.

Using a JavaScript object:

```javascript
import styleguidist from 'react-styleguidist'
const styleguide = styleguidist({
  logger: {
    warn: console.warn,
    info: console.log,
    debug: console.log
  },
  components: './lib/components/**/*.js',
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true
              }
            }
          ]
        }
      ]
    }
  }
})
```

> **Info:** Any output is disabled by default, you may need to define your own [logger](Configuration.md#logger).

Using a config file:

```javascript
import styleguidist from 'react-styleguidist'
const styleguide = styleguidist(require('../styleguide.config.js'))
```

Or auto searching a config file:

```javascript
import styleguidist from 'react-styleguidist'
const styleguide = styleguidist()
```

See all available [config options](Configuration.md).

## Methods

### `build(callback)`

#### Arguments

1.  `callback(err, config, stats)` (_Function_): A callback to be invoked when style guide is built:

    1.  `err` (_Object_): error details.
    2.  `config` (_Object_): normalized style guide config.
    3.  `stats` (_Object_): webpack build stats.

#### Returns

(_Compiler_): webpack `Compiler` instance.

#### Example

```javascript
import styleguidist from 'react-styleguidist'
styleguidist(require('../styleguide.config.js')).build(
  (err, config) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Style guide published to', config.styleguideDir)
    }
  }
)
```

### `server(callback)`

#### Arguments

1.  `callback(err, config)` (_Function_): A callback to be invoked when style guide is built:

    1.  `err` (_Object_): error details.
    2.  `config` (_Object_): normalized style guide config.

#### Returns

(_Object_): Object containing a webpack `Compiler` instance and the React Styleguidist server

#### Example

```javascript
import styleguidist from 'react-styleguidist'
styleguidist(require('../styleguide.config.js')).server(
  (err, config) => {
    if (err) {
      console.log(err)
    } else {
      const url = `http://${config.serverHost}:${config.serverPort}`
      console.log(`Listening at ${url}`)
    }
  }
)
```

### `makeWebpackConfig([env])`

#### Arguments

1.  \[`env`=`'production'`\] (_String_): `production` or `development`.

#### Returns

(_Object_): webpack config.

#### Example

```javascript
// webpack.config.js
module.exports = [
  {
    // User webpack config
  },
  // note that this is requiring rsg in commonjs mode
  // it does not need to access .default
  require('react-styleguidist').makeWebpackConfig()
]
```
