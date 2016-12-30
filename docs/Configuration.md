# Configuration

You can change settings in the `styleguide.config.js` file in your project’s root folder.

* **`components`**<br>
  Type: `String` or `Function`, required unless `sections` is provided<br>
  - when `String`: a [glob pattern](https://github.com/isaacs/node-glob#glob-primer) that matches all your component modules. Relative to config folder.
  - when `Function`: a function that returns an array of module paths.

  If your components look like `components/Button.js` or `components/Button/Button.js` or `components/Button/index.js`:

  ```javascript
  module.exports = {
    // ...
    components: './components/**/*.js',
  };
  ```

  If your components look like `components/Button/Button.js` + `components/Button/index.js`:

  ```javascript
  module.exports = {
    // ...
    components: './components/**/[A-Z]*.js',
  };
  ```

* **`sections`**<br>
  Type: `Array`

  Allows components to be grouped into sections with a title and optional overview content. Sections can also be content only, with no associated components (for example, a textual introduction). A section definition consists of:<br>
  - `name` — the title of the section.
  - `content` (optional) — location of a Markdown file containing the overview content.
  - `components` (optional) — a string or function returning a list of components. The same rules apply as for the root `components` option.
  - `sections` (optional) — array of subsections.

  Configuring a style guide with a textual introduction section, then a UI section would look like:

  ```javascript
  module.exports = {
    // ...
    sections: [
      {
        name: 'Introduction',
        content: 'docs/introduction.md',
      },
      {
        name: 'Documentation',
        sections: [
          {
            name: 'Installation',
            content: 'docs/installation.md',
          },
          {
            name: 'Configuration',
            content: 'docs/configuration.md',
          },
        ],
      },
      {
        name: 'UI Components',
        content: 'docs/ui.md',
        components: 'lib/components/ui/*.js',
      },
    ],
  };
  ```

* **`skipComponentsWithoutExample`**<br>
  Type: `Boolean`, default: `false`<br>
  Ignore components that don’t have an example file (as determined by `getExampleFilename`). These components won’t be accessible from other examples unless you manually `require` them.

* **`defaultExample`**<br>
  Type: `Boolean` or `String`, default: `false`<br>
  For components that do not have an example, a default one can be used. When set to `true`, the [DefaultExample.md](../src/templates/DefaultExample.md) is used, or you can provide the path to your own example Markdown file as a `String`.

  When writing your own default example file, `__COMPONENT__` will be replaced by the actual component name at compile-time.

* **`contextDependencies`**<br>
  Type: `Array of String`, optional<br>
  Array of strings that allow you to specify absolute paths of directories to
  watch for additions or removals of components. If you do not set this,
  styleguidist will determine the single directory that all of your components
  have in common and watch that.

  ```javascript
  module.exports = {
    // ...
    contextDependencies: [
      path.resolve(__dirname, 'lib/components'),
    ],
    // ...
  }
  ```

* **`showCode`**<br>
  Type: `Boolean`, default: `false`<br>
  Show or hide example code initially. It can be toggled in the UI by clicking the show/hide code toggle button underneath each example.

* **`styleguideDir`**<br>
  Type: `String`, default: `styleguide`<br>
  Folder for static HTML style guide generated with `styleguidist build` command.

* **`assetsDir`**<br>
  Type: `String`, optional<br>
  Your application static assets folder, will be accessible as `/` in the style guide dev-server.

* **`template`**<br>
  Type: `String`, default: [src/templates/index.html](https://github.com/styleguidist/react-styleguidist/blob/master/scripts/templates/index.html)<br>
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

* **`previewDelay`**<br>
  Type: `Number`, default: 500<br>
  Debounce time used before render the changes from the editor. While inserting code the preview will not be updated.

* **`getExampleFilename`**<br>
  Type: `Function`, default: finds `Readme.md` in the component folder<br>
  Function that returns examples file path for a given component path.

  For example, instead of `Readme.md` you can use `ComponentName.examples.md`:

  ```javascript
  module.exports = {
    // ...
    getExampleFilename(componentpath) {
      return componentpath.replace(/\.jsx?$/, '.examples.md');
    },
  };
  ```

* **`getComponentPathLine`**<br>
  Type: `Function`, default: optional<br>
  Function that returns a component path line (displayed under the component name).

  For example, instead of `components/Button/Button.js` you can print `import Button from 'components/Button';`:

  ```javascript
  const path = require('path');
  module.exports = {
    // ...
    getComponentPathLine: function(componentPath) {
      const name = path.basename(componentPath, '.js');
      const dir = path.dirname(componentPath);
      return 'import ' + name + ' from \'' + dir + '\';';
    },
  };
  ```

* **`updateWebpackConfig`**<br>
  Type: `Function`, optional<br>
  Function that allows you to modify Webpack config for style guide:

  ```javascript
  module.exports = {
    // ...
    updateWebpackConfig(webpackConfig, env) {
      if (env === 'development') {
        // Modify config...
      }
      return webpackConfig;
    },
  };
  ```

  See [FAQ](./FAQ.md) for examples.

* **`configureServer`**<br>
  Type: `Function`, optional<br>
  Function that allows you to add endpoints to the underlying `express` server:

  ```javascript
  module.exports = {
    // ...
    configureServer(app) {
       // `app` is the instance of the express server running react-styleguidist
    	app.get('/custom-endpoint', (req, res) => {
			res.status(200).send({ response: 'Server invoked' });
		});
    },
  };
  ```

  See [FAQ](./FAQ.md) for examples.

* **`propsParser`**<br>
  Type: `Function`, optional<br>
  Function that allows you to override the mechanism used to parse props from a source file. Default mechanism is using [react-docgen](https://github.com/reactjs/react-docgen) to parse props.

  ```javascript
  module.exports = {
    // ...
    propsParser(filePath, source) {
      return require('react-docgen').parse(source);
    },
  };
  ```

* **`resolver`**<br>
  Type: `Function`, optional<br>
  Function that allows you to override the mechanism used to identify classes/components to analyze. Default behaviour is to find a single exported component in each file and fail if more than one export is found. You can configure it to find all components or use a custom detection method. See the [react-docgen resolver documentation](https://github.com/reactjs/react-docgen#resolver) for more information about resolvers.

  ```javascript
  module.exports = {
    // ...
    resolver: require('react-docgen').resolver.findAllComponentDefinitions,
  };
  ```

* **`handlers`**<br>
  Type: `Array of Function`, optional, default: [[react-docgen-displayname-handler](https://github.com/nerdlabs/react-docgen-displayname-handler)]<br>
  Array of functions used to process the discovered components and generate documentation objects. Default behaviours include discovering component documentation blocks, prop types, and defaults. If setting this property, it is best to build from the default `react-docgen` handler list, such as in the example below. See the [react-docgen handler documentation](https://github.com/reactjs/react-docgen#handlers) for more information about handlers.

  Also note that the default handler, `react-docgen-displayname-handler` should be included to better support higher order components.

  ```javascript
  module.exports = {
    // ...
    handlers: require('react-docgen').defaultHandlers.concat(
      (documentation, path) => {
        // Calculate a display name for components based upon the declared class name.
        if (path.value.type === 'ClassDeclaration' && path.value.id.type === 'Identifier') {
          documentation.set('displayName', path.value.id.name);

          // Calculate the key required to find the component in the module exports
          if (path.parentPath.value.type === 'ExportNamedDeclaration') {
            documentation.set('path', path.value.id.name);
          }
        }

        // The component is the default export
        if (path.parentPath.value.type === 'ExportDefaultDeclaration') {
          documentation.set('path', 'default');
        }
      },
      // To better support higher order components
      require('react-docgen-displayname-handler').default,
    ),
  };
  ```
