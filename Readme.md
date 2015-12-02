# React Styleguidist

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

Examples are written in Markdown where any code block will be rendered as a react component. By default any `Readme.md` in the component folder is treated as an examples file but you can change it with the `getExampleFilename` option.

```markdown
React component example:

  <Button size="large">Push Me</Button>

Any [Markdown](http://daringfireball.net/projects/markdown/):

* Foo;
* bar;
* baz.
```

You can use any component returned by the `components` function. You can require other modules from examples in Markdown:

```js
const mockData = require('./mocks');
<Message content={mockData.hello}/>
```

This allows you to reuse mock data from your tests in the style guide.

Each example has its own state that you can access at the `state` variable and change with the `setState` function. Default state is `{}`.

```js
<div>
  <button onClick={() => setState({isOpen: true})}>Open</button>
  <Modal isOpen={state.isOpen}>
    <h1>Hallo!</h1>
    <button onClick={() => setState({isOpen: false})}>Close</button>
  </Modal>
</div>
```

If you want to set the default state you can do something like that:

```js
'key' in state || setState({key: 42});
```

You can use `React.createClass` in your code examples, but it’s often a good idea to define them in a separate JavaScript file instead and then just require them in Markdown.

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
  module.exports = {
    // ...
    components: function(config, glob) {
      return glob.sync(config.rootDir + '/components/**/*.js').filter(function(module) {
        return /\/[A-Z]\w*\.js$/.test(module);
      });
    }
  };
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
  module.exports = {
    // ...
    getExampleFilename: function(componentpath) {
      return componentpath.replace(/\.jsx?$/,   '.examples.md');
    }
  };
  ```

* **`getComponentPathLine`**<br>
  Type: `Function`, default: optional<br>
  Function that returns a component path line (a component path under a component name in a style guide).

  For example, instead of `components/Button/Button.js` you can print `import Button from 'components/Button';`:

  ```javascript
  var path = require('path');
  module.exports = {
    // ...
    getComponentPathLine: function(componentpath) {
      var name = path.basename(componentpath, '.js');
      var dir = path.dirname(componentpath);
      return 'import ' + name + ' from \'' + dir + '\';';
    }
  };
  ```

* **`updateWebpackConfig`**<br>
  Type: `Function`, optional<br>
  Function that allows you to modify Webpack config for style guide:

  ```javascript
  module.exports = {
    // ...
    updateWebpackConfig: function(webpackConfig, env) {
      if (env === 'development') {
        // Modify config...
      }
      return webpackConfig;
    }
  };
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

## FAQ

### How to add custom JS and CSS?

Add a new Webpack entry point. In your style guide config:

```javascript
var path = require('path');
module.exports = {
  // ...
  updateWebpackConfig: function(webpackConfig, env) {
    webpackConfig.entry.push(path.join(__dirname, 'path/to/script.js'));
    webpackConfig.entry.push(path.join(__dirname, 'path/to/styles.css'));
    return webpackConfig;
  }
};
```

You may need an appropriate Webpack loader to handle these files.

### How to change styles of a style guide?

Add a new Webpack entry point in your style guide config:

```javascript
var path = require('path');
module.exports = {
  // ...
  updateWebpackConfig: function(webpackConfig, env) {
    webpackConfig.entry.push(path.join(__dirname, 'lib/styleguide/styles.css'));
    return webpackConfig;
  }
};
```

Now you can change almost any piece of a style guide. For example you can change a font and a background color:

```css
.ReactStyleguidist-common__font {
  font-family: "Comic Sans MS", "Comic Sans", cursive;
}
.ReactStyleguidist-colors__base-bg {
  background: hotpink;
}
```

Use your browser’s developer tools to find CSS class names of the elements you want to change.

### How to change the behaviour of a style guide?

You can replace any Styleguidist React component. In your style guide config:

```javascript
var path = require('path');
module.exports = {
  // ...
  updateWebpackConfig: function(webpackConfig, env) {
    webpackConfig.resolve.alias['rsg-components/StyleGuide'] = path.join(__dirname, 'lib/styleguide/StyleGuide');
    return webpackConfig;
  }
};
```

Also there are two special wrapper components. They do nothing by themeselves and were made specifically to be replaced with a custom logic:

* `StyleGuide` — the root component of a style gude React app.
* `Wrapper` — wraps every example component.

For example you can replace the `Wrapper` component to wrap any example component in the [React Intl’s](http://formatjs.io/react/) provider component. You can’t wrap the whole style guide because every example component is compiled separately in a browser.

```javascript
// styleguide.config.js
var path = require('path');
module.exports = {
  // ...
  updateWebpackConfig: function(webpackConfig, env) {
    webpackConfig.resolve.alias['rsg-components/Wrapper'] = path.join(__dirname, 'lib/styleguide/Wrapper');
    return webpackConfig;
  }
};

// lib/styleguide/Wrapper.js
import React, { Component } from 'react';
import { IntlProvider } from 'react-intl';
export default class Wrapper extends Component {
  render() {
    return (
      <IntlProvider locale="en">
        {this.props.children}
      </IntlProvider>
    );
  }
}
```

### How to debug my components and examples?

1. Open your browser’s developer tools
2. Press the ![Debugger](http://wow.sapegin.me/image/2n2z0b0l320m/debugger.png) button to make the debugger stop execution on any exception.
3. Write `debugger;` statement wherewhere you want: in a component source, a Markdown example or even in an editor in a browser.

![](http://wow.sapegin.me/image/002N2q01470J/debugging.png)

### How to debug the exceptions thrown from my components?

1. Put `debugger;` statement at the beginning of your code.
2. Press the ![Debugger](http://wow.sapegin.me/image/2n2z0b0l320m/debugger.png) button in your browser’s developer tools.
3. Press the ![Continue](http://wow.sapegin.me/image/2d2z1Y2o1z1m/continue.png) button and the debugger will stop exception a the next exception.

## Similar projects

* [heatpack](https://github.com/insin/react-heatpack), a quick to setup hot-reloaded development server for React components.
* [Demobox](https://github.com/jaredly/demobox), a component for making component showcases for landing pages.
* [React-demo](https://github.com/rpominov/react-demo), a component for creating demos of other components with props editor.
* [SourceJS](https://github.com/sourcejs/Source), a platform to unify all your frontend documentation. It has a [Styleguidist plugin](https://github.com/sourcejs/sourcejs-react-styleguidist).

## Changelog

The changelog can be found on the [Releases page](https://github.com/sapegin/react-styleguidist/releases).

## Contributing

Everyone is welcome to contribute. Please take a moment to review the [contributing guidelines](Contributing.md).

## Author

* [Artem Sapegin](http://sapegin.me)

---

## License

The MIT License, see the included [License.md](License.md) file.
