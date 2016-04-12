# React Styleguidist

[![Build Status](https://travis-ci.org/sapegin/react-styleguidist.svg)](https://travis-ci.org/sapegin/react-styleguidist) [![Dependency Status](https://david-dm.org/sapegin/react-styleguidist.svg)](https://david-dm.org/sapegin/react-styleguidist) [![npm](https://img.shields.io/npm/v/react-styleguidist.svg)](https://www.npmjs.com/package/react-styleguidist)

React Styleguidist is a style guide generator for React components. It lists component `propTypes` and shows live, editable usage examples based on Markdown files. You can use it to generate a static HTML page to share and publish or as a workbench for developing new components using hot reloaded dev server. Check out [**the demo style guide**](http://sapegin.github.io/react-styleguidist/).

Based on Webpack, webpack-dev-server and Babel.

![](https://s3.amazonaws.com/f.cl.ly/items/3i0E1D1L1c1m1s2G1d0y/Screen%20Recording%202015-09-24%20at%2009.49%20AM.gif)

## Installation

**Requirements:** Only Babel 6 is supported in [Styleguidist 2.0.0](https://github.com/sapegin/react-styleguidist/releases/tag/2.0.0)+. If you don't use Babel in your project, that's fine, but if you use Babel 5, please use Styleguidist 1.3.2. Webpack is recommended, but not required.

1. Install from npm:

   ```bash
   npm install --save-dev react-styleguidist
   ```

2. Add a **`styleguide.config.js`** file into your project’s root folder. A simplest possible config looks like this:

   ```javascript
   module.exports = {
     title: 'My Great Style Guide',
     components: './lib/components/**/*.js',
     // Put other configuration options here...
   };
  ```

3. If you use transpilers to run your project files (JSX → JS, SCSS → CSS, etc), you need to set them up for the style guide too.

   Styleguidist generates a webpack config that contains all that is needed for the style guide, but you need to configure the [webpack loaders](https://webpack.github.io/docs/configuration.html#module-loaders) for your project code.

   Put the `updateWebpackConfig` function in your `styleguide.config.js`:

   ```javascript
   var path = require('path');
   module.exports = {
     updateWebpackConfig: function(webpackConfig, env) {
       // Your source files folder or array of folders, should not include node_modules
       let dir = path.join(__dirname, 'src');
       webpackConfig.module.loaders.push(
         // Babel loader will use your project’s .babelrc
         {
           test: /\.jsx?$/,
           include: dir,
           loader: 'babel'
         },
         // Other loaders that is needed for your components
         {
           test: /\.css$/,
           include: dir,
           loader: 'style!css?modules&importLoaders=1'
         }
       );
       return webpackConfig;
     },
   };
   ```

   **Note**: don’t forget `include` or `exclude` options for your Webpack loaders, otherwise they will interfere with Styleguidist’s loaders. Also do not include `node_modules` folder.

4. Configure [React Transform HMR](https://github.com/gaearon/react-transform-hmr) (hot module replacement). This is optional, but highly recommended.

   Install React Transform for Babel (if you don't have it yet): `npm install --save-dev babel-preset-react-hmre`.

   When you run the styleguidist server, `NODE_ENV` is set to `development` and when you build style guide `NODE_ENV` is set to `production`. You can use this fact to enable HMR only in development. So update your `.babelrc`:

   ```json
   {
     "presets": ["es2015", "react"],
     "env": {
       "development": {
         "presets": ["react-hmre"]
       }
     }
   }
   ```

5. Add these scripts to your `package.json`:

  ```javascript
  {
    // ...
    "scripts": {
      "styleguide-server": "styleguidist server",
      "styleguide-build": "styleguidist build"
    }
  }
  ```

6. Run **`npm run styleguide-server`** to start style guide dev server.

To customize your style guide, head to the [Configuration section](#configuration) below.


## Documenting components

Styleguidist generates documentation from 2 sources:

* **PropTypes and component description** in the source code

  Components' `PropTypes` and documentation comments are parsed by the [react-docgen](https://github.com/reactjs/react-docgen) library. Have a look at [their example](https://github.com/reactjs/react-docgen#example) of a component documentation.

* **Usage examples and further documentation** in Markdown

  Examples are written in Markdown where any code block without a tag will be rendered as a react component. By default any   `Readme.md` in the component folder is treated as an examples file but you can change it with the `getExampleFilename` option.

  ```markdown
  React component example:

      <Button size="large">Push Me</Button>

  Any [Markdown](http://daringfireball.net/projects/markdown/) is **allowed** _here_.
  ```

* **Loading examples using doclet tags**

  Additional example files can be specifically associated with components using doclet (`@example`) syntax.
  The following component will also have an example as loaded from the `extra.examples.md` file.

  ```js
  /**
   * Component is described here.
   *
   * @example ./extra.examples.md
   */
  export default class SomeComponent extends React.Component {
    // ...
  }
  ```

### Writing code examples

Code examples in Markdown use the ES6+JSX syntax. They can access all the components listed, they are exposed as global variables.

You can also `require` other modules (e.g. mock data that you use in your unit tests) from examples in Markdown:

```js
const mockData = require('./mocks');
<Message content={mockData.hello}/>
```

Or you can `import` external files into your examples:

  import {female} from "dog-names";
  <RandomButton variants={female}/>

As an utility, also the [lodash](https://lodash.com/) library is available globally as `_`.

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

If you want to set the default state you can do:

```js
'key' in state || setState({key: 42});
```

You *can* use `React.createClass` in your code examples, but if you need a more complex demo it’s often a good idea to define it in a separate JavaScript file instead and then just `require` it in Markdown.


## Configuration

You can change some settings in the `styleguide.config.js` file in your project’s root folder.

* **`components`**<br>
  Type: `String` or `Function`, required unless `sections` is provided<br>
  - when `String`: a [glob pattern](https://github.com/isaacs/node-glob#glob-primer) that matches all your component modules. Relative to config folder.
  - when `Function`: a function that returns an array of module paths.

  If your components look like `components/Button.js` or `components/Button/Button.js` or `components/Button/index.js`:

  ```javascript
  components: './components/**/*.js',
  ```

  If your components look like `components/Button/Button.js` + `components/Button/index.js`:

  ```javascript
  var path = require('path');
  var glob = require('glob');
  module.exports = {
    // ...
    components: function() {
      return glob.sync(path.resolve(__dirname, 'lib/components/**/*.js')).filter(function(module) {
        return /\/[A-Z]\w*\.js$/.test(module);
      });
    }
  };
  ```

* **`sections`**<br>
  Type: `Array`

  Allows components to be grouped into sections with a title and optional overview content. Sections
  can also be content only, with no associated components (for example, a textual introduction). A section
  definition consists of:<br>
  - `name` - the title of the section.
  - `content` (optional) - location of a Markdown file containing the overview content.
  - `components` (optional) - a string or function providing a list of components. The same rules apply as for the root `components` option.

  Configuring a guide with a textual introduction section, then a UI section would look like:

  ```javascript
  module.exports = {
    // ...
    sections: [
      {name: 'Introduction', content: 'docs/introduction.md'},
      {name: 'UI Components', content: 'docs/ui.md', components: 'lib/components/ui/*.js'}
    ]
  }
  ```

* **`skipComponentsWithoutExample`**<br>
  Type: `Boolean`, default: `false`<br>
  When set to `true`, ignore components that don't have an example file (as determined by `getExampleFilename`).

* **`styleguideDir`**<br>
  Type: `String`, default: `styleguide`<br>
  Folder for static HTML style guide generated with `styleguidist build` command.

* **`assetsDir`**<br>
  Type: `String`, optional<br>
  Your application static assets folder, will be accessible as `/` in the style guide dev-server.

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
  Function that returns a component path line (displayed under the component name).

  For example, instead of `components/Button/Button.js` you can print `import Button from 'components/Button';`:

  ```javascript
  var path = require('path');
  module.exports = {
    // ...
    getComponentPathLine: function(componentPath) {
      var name = path.basename(componentPath, '.js');
      var dir = path.dirname(componentPath);
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

* **`propsParser`**<br>
  Type: `Function`, optional<br>
  Function that allows you to override the mechanism used to parse props from a source file. Default mechanism is using
  [react-docgen](https://github.com/reactjs/react-docgen) to parse props.

  ```javascript
  module.exports = {
    // ...
    propsParser: function(filePath, source) {
      return require('react-docgen').parse(source);
    }
  }
  ```

* **`resolver`**<br>
  Type: `Function`, optional<br>
  Function that allows you to override the mechanism used to identify classes/components to analyze. Default
  behaviour is to find a single exported component in each file (and failing if more than one export is found).
  Other behaviours can be configured, such as finding all components or writing a custom detection method. See
  the [react-docgen resolver documentation](https://github.com/reactjs/react-docgen#resolver) for more
  information about resolvers.

  ```javascript
  module.exports = {
    // ...
    resolver: require('react-docgen').resolver.findAllComponentDefinitions
  }
  ```

* **`handlers`**<br>
  Type: `Array of Function`, optional<br>
  Array of functions used to process the discovered components and generate documentation objects. Default
  behaviours include discovering component documentation blocks, prop types and defaults. If setting this
  property, it is best to build from the default `react-docgen` handler list, such as in the example below.
  See the [react-docgen handler documentation](https://github.com/reactjs/react-docgen#handlers) for more
  information about handlers.

  ```javascript
  module.exports = {
    // ...
    handlers: require('react-docgen').defaultHandlers.concat(function(documentation, path) {
      // Calculate a display name for components based upon the declared class name.
      if (path.value.type == 'ClassDeclaration' && path.value.id.type == 'Identifier') {
        documentation.set('displayName', path.value.id.name);

        // Calculate the key required to find the component in the module exports
        if (path.parentPath.value.type == 'ExportNamedDeclaration') {
          documentation.set('path', path.value.id.name);
        }
      }

      // The component is the default export
      if (path.parentPath.value.type == 'ExportDefaultDeclaration') {
        documentation.set('path', 'default');
      }
    }))
  }
  ```


## CLI commands and options

These commands supposed to be placed in `package.json` `scripts` (see Installation section above). If you want to run them directly, use `./node_modules/.bin/styleguidist`.

`styleguidist server`: Run dev server.

`styleguidist build`: Generate a static HTML style guide.

CLI Options:

* `--config <file>`: Specify path to the config file.
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

Also there are two special wrapper components. They do nothing by themselves and were made specifically to be replaced with a custom logic:

* `StyleGuide` — the root component of a style guide React app.
* `Wrapper` — wraps every example component.

For example you can replace the `Wrapper` component to wrap any example in the [React Intl’s](http://formatjs.io/react/) provider component. You can’t wrap the whole style guide because every example is compiled separately in a browser.

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
2. Write `debugger;` statement wherever you want: in a component source, a Markdown example or even in an editor in a browser.

![](http://wow.sapegin.me/image/002N2q01470J/debugging.png)

### How to debug the exceptions thrown from my components?

1. Put `debugger;` statement at the beginning of your code.
2. Press the ![Debugger](http://wow.sapegin.me/image/2n2z0b0l320m/debugger.png) button in your browser’s developer tools.
3. Press the ![Continue](http://wow.sapegin.me/image/2d2z1Y2o1z1m/continue.png) button and the debugger will stop execution at the next exception.

### Why does the style guide list one of my prop types as `unknown`?

This occurs when you are assigning props via `getDefaultProps` that are not listed within the components `propTypes`.

For example, the color prop here is assigned via `getDefaultProps` but missing from the `propTypes`, therefore the style guide is unable to display the correct prop type.

```javascript
Button.propTypes = {
  children: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'normal', 'large']),
};

Button.defaultProps = {
  color: '#333',
  size: 'normal'
};
```

## Similar projects

* [React Styleguide Generator](https://github.com/pocotan001/react-styleguide-generator), a React style guide generator.
* [heatpack](https://github.com/insin/react-heatpack), a quick to setup hot-reloaded development server for React components.
* [Demobox](https://github.com/jaredly/demobox), a component for making component showcases for landing pages.
* [React-demo](https://github.com/rpominov/react-demo), a component for creating demos of other components with props editor.
* [Atellier](https://github.com/scup/atellier), a React components emulator.
* [Cosmos](https://github.com/skidding/cosmos), a tool for designing truly encapsulated React components.
* [SourceJS](https://github.com/sourcejs/Source), a platform to unify all your frontend documentation. It has a [Styleguidist plugin](https://github.com/sourcejs/sourcejs-react-styleguidist).

## Changelog

The changelog can be found on the [Releases page](https://github.com/sapegin/react-styleguidist/releases).

## Contributing

Everyone is welcome to contribute. Please take a moment to review the [contributing guidelines](Contributing.md).

## Author and License

[Artem Sapegin](http://sapegin.me) and [contributors](https://github.com/sapegin/react-styleguidist/graphs/contributors).

MIT License, see the included [License.md](License.md) file.
