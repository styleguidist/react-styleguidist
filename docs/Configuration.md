# Configuration

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

* **`defaultExample`**<br>
  Type: `Boolean` or `String`, default: `false`<br>
  For components that do not have an example, a default one can be used. When set to `true`, the [src/templates/DefaultExample.md](../src/templates/DefaultExample.md) is used, or you can provide the path to your own example markdown file as a `String`.

  When writing your own default example file, `__COMPONENT__` will be replaced by the actual component name at compile-time.

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
