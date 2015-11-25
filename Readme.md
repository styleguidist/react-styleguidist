# React Styleguidist :skull: work in progress :skull:

[![Build Status](https://travis-ci.org/sapegin/react-styleguidist.svg)](https://travis-ci.org/sapegin/react-styleguidist)

React components style guide generator with a hot reloaded (style guide) dev server.

[Example style guide](http://sapegin.github.io/react-styleguidist/).

![](https://s3.amazonaws.com/f.cl.ly/items/3i0E1D1L1c1m1s2G1d0y/Screen%20Recording%202015-09-24%20at%2009.49%20AM.gif)

## Installation

```
npm install --save-dev react react-dom react-styleguidist
```

Add a `styleguide.config.js` file into your project’s root folder:

```javascript
module.exports = {
  rootDir: './lib',
  components: './components/**/*.js'
};
```

See Configuration section below for the list of available options.

Add these scripts to your `package.json`:

```json
"scripts": {
  "styleguide-server": "styleguidist server",
  "styleguide-build": "styleguidist build"
},
```

And run `npm run styleguide-server` to start styleguide dev server.

## Documenting components

Styleguidist generates documentation from 2 sources:

### PropTypes and component description

Components' `PropTypes` and documentation comments are parsed by the [react-docgen](https://github.com/reactjs/react-docgen) library. Have a look at [their example](https://github.com/reactjs/react-docgen#example) of a component documentation.

### Usage examples and further documentation

Examples are written in Markdown where any code blocks will be rendered as a react components. By default any `Readme.md` in the component folder is treated as an examples file but you can change it with the `getExampleFilename` option.

```markdown
React component example:

  <Button size="large">Push Me</Button>

Any [Markdown](http://daringfireball.net/projects/markdown/):

* Foo;
* bar;
* baz.
```

## Configuration

You can change some settings in the `styleguide.config.js` file in your project’s root folder.

* **`rootDir`**<br>
  Type: `String`, required<br>
  Your app’s frontend root folder (eg. `./lib`). Should not point to a folder with the Styleguidist config and `node_modules` folder.

* **`components`**<br>
  Type: `String` or `Function`, required<br>
  - when `String`: a [glob pattern](https://github.com/isaacs/node-glob#glob-primer) that matches all your component modules. Relative to the `rootDir`.
  - when `Function`: function that returns an array of modules.

  If your components look like `components/Button.js` or `components/Button/Button.js` or `components/Button/index.js`:

  ```javascript
  components: './components/**/*.js',
  ```

  If your components look like `components/Button/Button.js` + `components/Button/index.js`:

  ```javascript
  components: function(config, glob) {
    return glob.sync(config.rootDir + '/components/**/*.js').filter(function(module) {
      return /\/[A-Z][a-z]*\.js$/.test(module);
    });
  },
  ```

* **`skipComponentsWithoutExample`**<br>
  Type: `Boolean`, default: `false`<br>
  When set to `true`, ignore components that don't have an example file (as determined by `getExampleFilename`).

* **`styleguideDir`**<br>
  Type: `String`, default: `styleguide`<br>
  Folder for static HTML style guide generated with `styleguidist build` command.

* **`template`**<br>
  Type: `String`, default: [src/templates/index.html](src/templates/index.html)<br>
  HTML file to use as the template for the output.

* **`title`**<br>
  Type: `String`, default: `Style guide`<br>
  Style guide title.

* **`serverHost`**<br>
  Type: `String`, default: `localhost`<br>
  Dev server host name.

* **`serverPort`**<br>
  Type: `Number`, default: `3000`<br>
  Dev server port.

* **`highlightTheme`**<br>
  Type: `String`, default: `base16-light`<br>
  [CodeMirror theme](http://codemirror.net/demo/theme.html) name to use for syntax highlighting in examples.

* **`getExampleFilename`**<br>
  Type: `Function`, default: finds `Readme.md` in the component folder<br>
  Function that returns examples file path for a given component path.

  For example, instead of `Readme.md` you can use `ComponentName.examples.md`:

  ```javascript
  getExampleFilename: function(componentpath) {
    return componentpath.replace(/\.jsx?$/,   '.examples.md');
  }
  ```

* **`getComponentPathLine`**<br>
  Type: `Function`, default: optional<br>
  Function that returns a component path line (a component path under a component name in a style guide).

  For example, instead of `components/Button/Button.js` you can print `import Button from 'components/Button';`:

  ```javascript
  var path = require('path');
  // ...
  getComponentPathLine: function(componentpath) {
    var name = path.basename(componentpath, '.js');
    var dir = path.dirname(componentpath);
    return 'import ' + name + ' from \'' + dir + '\';';
  }
  ```

* **`updateWebpackConfig`**<br>
  Type: `Function`, optional<br>
  Function that allows you to modify Webpack config for style guide:

  ```javascript
  updateWebpackConfig: function(webpackConfig, env) {
    if (env === 'development') {
      /* ... modify config ... */
    }
    return webpackConfig;
  }
  ```

### Config example

```javascript
module.exports = {
  title: 'Style guide example',
  rootDir: './example',
  components: './**/*.js',
  getExampleFilename: function(componentpath) {
    return componentpath.replace(/\.js$/, '.examples.md');
  },
};
```

## CLI commands and options

These commands supposed to be placed in `package.json` `scripts` (see Installation section above). If you want to run them from command line do it like this: `./node_modules/.bin/styleguidist`.

`styleguidist server`: Run dev server.

`styleguidist build`: Generate a static HTML style guide.

### Options

* `--config`: Specify path to a config file: `styleguidist server --config dir/styleguide.config.js`.

* `--verbose`: Print debug information.

## Changelog

The changelog can be found on the [Releases page](https://github.com/sapegin/react-styleguidist/releases).

## Contributing

Everyone is welcome to contribute. Please take a moment to review the [contributing guidelines](Contributing.md).

## Author

* [Artem Sapegin](http://sapegin.me)

---

## License

The MIT License, see the included [License.md](License.md) file.
