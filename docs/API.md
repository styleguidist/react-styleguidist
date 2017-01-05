# Node API

## Initialization

First, you need to initialize the API with your style guide config.

Using a JavaScript object:

```javascript
const styleguidist = require('react-styleguidist');
const styleguide = styleguidist({
  components: './lib/components/**/*.js',
  updateWebpackConfig(webpackConfig) {
    const dir = path.resolve(__dirname, 'lib/components');
    webpackConfig.module.loaders.push(
      {
        test: /\.jsx?$/,
        include: dir,
        loader: 'babel',
      },
      {
        test: /\.css$/,
        include: dir,
        loader: 'style!css?modules&importLoaders=1',
      }
    );
    return webpackConfig;
  },
});
```

Using a config file:

```javascript
const styleguidist = require('react-styleguidist');
const styleguide = styleguidist(require('../styleguide.config.js'));
```

Or auto searching a config file:

```javascript
const styleguidist = require('react-styleguidist');
const styleguide = styleguidist();
```

See all available [config options](./Configuration.md).

## Methods

### `build(callback)`

#### Arguments

1. `callback(err, config, stats)` (*Function*): A callback to be invoked when style guide is built:
  1. `err` (*Object*): error details.
  2. `config` (*Object*): normalized style guide config.
  3. `stats` (*Object*): Webpack build stats.

#### Returns

(*Compiler*): Webpack `Compiler` instance.

#### Example

```javascript
const styleguidist = require('react-styleguidist');
styleguidist(require('../styleguide.config.js')).build((err, config) => {
  if (err) {
    console.log(err);
  }
  else {
    console.log('Style guide published to', config.styleguideDir);
  }
});
```


### `server(callback)`

#### Arguments

1. `callback(err, config)` (*Function*): A callback to be invoked when style guide is built:
  1. `err` (*Object*): error details.
  2. `config` (*Object*): normalized style guide config.

#### Returns

(*Compiler*): Webpack `Compiler` instance.

#### Example

```javascript
const styleguidist = require('react-styleguidist');
styleguidist(require('../styleguide.config.js')).server((err, config) => {
  if (err) {
    console.log(err);
  }
  else {
    console.log('Listening at http://' + config.serverHost + ':' + config.serverPort);
  }
});
```

### `makeWebpackConfig([env])`

#### Arguments

1. \[`env`=`'production'`\] (*String*): `production` or `development`.

#### Returns

(*Object*): Webpack config.

#### Example

```javascript
// webpack.config.js
module.exports = [
    {
      // User webpack config
    },
    require('react-styleguidist')().makeWebpackConfig(),
];
```
