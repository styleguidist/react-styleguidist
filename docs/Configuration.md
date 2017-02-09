# Configuration

You can change settings in the `styleguide.config.js` file in your project’s root folder.

#### `assetsDir`

Type: `String`, optional

Your application static assets folder, will be accessible as `/` in the style guide dev server.

#### `components`

Type: `String` or `Function`, default: `src/components/**/*.js`

- when `String`: a [glob pattern](https://github.com/isaacs/node-glob#glob-primer) that matches all your component modules.
- when `Function`: a function that returns an array of module paths.

All paths are relative to config folder.

If your components look like `components/Button.js` or `components/Button/Button.js` or `components/Button/index.js` (it’s the default behavior, change only if your components are not in `src/components` or files are not `.js`):

```javascript
module.exports = {
  components: 'components/**/*.js',
};
```

If your components look like `components/Button/Button.js` + `components/Button/index.js` (you need to skip `index.js`, otherwise component will be loaded twice):

```javascript
module.exports = {
  components: 'components/**/[A-Z]*.js',
};
```

Or you need to skip test specs (`components/Button/Button.test.js`):

```javascript
module.exports = {
  components: 'components/**/!(*.test).js',
};
```

#### `context`

Type: `Object`, optional

Modules that will be available for examples. You can use it for utility functions like Lodash or for data fixtures.

```javascript
module.exports = {
  context: {
    map: 'lodash/map',
    users: './fixtures/users',
  },
};
```

Then you can use them in any example:

```javascript
<Message>{map(users, 'name').join(', ')}</Message>
```

#### `contextDependencies`

Type: `String[]`, optional

Array of absolute paths that allow you to specify absolute paths of directories to watch for additions or removals of components.

By default Styleguidist uses common parent directory of your components.

```javascript
module.exports = {
  contextDependencies: [
    path.resolve(__dirname, 'lib/components'),
  ],
}
```

#### `configureServer`

Type: `Function`, optional

Function that allows you to add endpoints to the underlying `express` server:

```javascript
module.exports = {
  configureServer(app) {
     // `app` is the instance of the express server running Styleguidist
    app.get('/custom-endpoint', (req, res) => {
      res.status(200).send({ response: 'Server invoked' });
    });
  },
};
```

See [FAQ](./FAQ.md) for examples.

#### `defaultExample`

Type: `Boolean` or `String`, default: `false`

For components that do not have an example, a default one can be used. When set to `true`, the [DefaultExample.md](../scripts/templates/DefaultExample.md) is used, or you can provide the path to your own example Markdown file.

When writing your own default example file, `__COMPONENT__` will be replaced by the actual component name at compile-time.

#### `getComponentPathLine`

Type: `Function`, default: optional

Function that returns a component path line (displayed under the component name).

For example, instead of `components/Button/Button.js` you can print `import Button from 'components/Button';`:

```javascript
const path = require('path');
module.exports = {
  getComponentPathLine: function(componentPath) {
    const name = path.basename(componentPath, '.js');
    const dir = path.dirname(componentPath);
    return `import ${name} from '${dir}';`;
  },
};
```

#### `getExampleFilename`

Type: `Function`, default: finds `Readme.md` or `ComponentName.md` in the component folder

Function that returns examples file path for a given component path.

For example, instead of `Readme.md` you can use `ComponentName.examples.md`:

```javascript
module.exports = {
  getExampleFilename(componentPath) {
    return componentPath.replace(/\.jsx?$/, '.examples.md');
  },
};
```

#### `handlers`

Type: `Function[]`, optional, default: [[react-docgen-displayname-handler](https://github.com/nerdlabs/react-docgen-displayname-handler)]

Functions used to process the discovered components and generate documentation objects. Default behaviours include discovering component documentation blocks, prop types, and defaults. If setting this property, it is best to build from the default `react-docgen` handler list, such as in the example below. See the [react-docgen handler documentation](https://github.com/reactjs/react-docgen#handlers) for more information about handlers.

Also note that the default handler, `react-docgen-displayname-handler` should be included to better support higher order components.

```javascript
module.exports = {
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

#### `highlightTheme`

Type: `String`, default: `base16-light`

[CodeMirror theme](http://codemirror.net/demo/theme.html) name to use for syntax highlighting in the editor.

#### `previewDelay`

Type: `Number`, default: 500

Debounce time in milliseconds used before render the changes from the editor. While typing code the preview will not be updated.

#### `propsParser`

Type: `Function`, optional

Function that allows you to override the mechanism used to parse props from a source file. Default mechanism is using [react-docgen](https://github.com/reactjs/react-docgen) to parse props.

```javascript
module.exports = {
  propsParser(filePath, source) {
    return require('react-docgen').parse(source);
  },
};
```

#### `resolver`

Type: `Function`, optional

Function that allows you to override the mechanism used to identify classes/components to analyze. Default behaviour is to find all exported components in each file. You can configure it to find all components or use a custom detection method. See the [react-docgen resolver documentation](https://github.com/reactjs/react-docgen#resolver) for more information about resolvers.

```javascript
module.exports = {
  resolver: require('react-docgen').resolver.findAllComponentDefinitions,
};
```

#### `sections`

Type: `Array`, optional

Allows components to be grouped into sections with a title and optional overview content. Sections can also be content only, with no associated components (for example, a textual introduction). A section definition consists of:

- `name` — the title of the section.
- `content` (optional) — location of a Markdown file containing the overview content.
- `components` (optional) — a string or function returning a list of components. The same rules apply as for the root `components` option.
- `sections` (optional) — array of subsections.

Configuring a style guide with a textual introduction section, then a UI section would look like:

```javascript
module.exports = {
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

#### `serverHost`

Type: `String`, default: `localhost`

Dev server host name.

#### `serverPort`

Type: `Number`, default: `3000`

Dev server port.

#### `showCode`

Type: `Boolean`, default: `false`

Show or hide example code initially. It can be toggled in the UI by clicking the show/hide code button before each example.

#### `skipComponentsWithoutExample`

Type: `Boolean`, default: `false`

Ignore components that don’t have an example file (as determined by `getExampleFilename`). These components won’t be accessible from other examples unless you manually `require` them.

#### `styleguideDir`

Type: `String`, default: `styleguide`

Folder for static HTML style guide generated with `styleguidist build` command.

#### `styles`

Type: `object`, optional

Customize styles of any Styleguidist’s component.

```javascript
module.exports = {
  styles: {
    Logo: {
      logo: {
        animation: 'blink ease-in-out 300ms infinite',
      },
      '@keyframes blink': {
        to: { opacity: 0 },
      },
    },
  },
};
```

> **Note:** Styles use [JSS syntax](https://github.com/cssinjs/jss/blob/master/docs/json-api.md).

> **Note:** Use your browser’s developer tools to find component and style names. For example class name `.rsg--Logo--logo` corresponds to an example above.

#### `template`

Type: `String`, default: [src/templates/index.html](https://github.com/styleguidist/react-styleguidist/blob/master/scripts/templates/index.html)

HTML file to use as the template for the style guide. HTML webpack Plugin is used under the hood, see [their docs for details](https://github.com/ampedandwired/html-webpack-plugin/blob/master/docs/template-option.md).

#### `theme`

Type: `object`, optional

Customize style guide UI fonts, colors, etc.

```javascript
module.exports = {
  theme: {
    link: 'firebrick',
    linkHover: 'salmon',
    font: '"Comic Sans MS", "Comic Sans", cursive',
  },
};
```

> **Note:** See available [theme variables](https://github.com/styleguidist/react-styleguidist/blob/master/src/styles/theme.js).

#### `title`

Type: `String`, default: `<app name from package.json> Style Guide`

Style guide title.

#### `updateWebpackConfig`

Type: `Function`, optional

> **Warning:** deprecated, use `webpackConfigFile` or `webpackConfig` options instead.

Function that allows you to modify webpack config for style guide.

```javascript
module.exports = {
  // ...
  updateWebpackConfig(webpackConfig, env) {
    // WARNING: inspect Styleguidist Webpack config before modifying it, otherwise you may break Styleguidist
    console.log(webpackConfig);
    if (env === 'development') {
      // Modify config...
    }
    return webpackConfig;
  },
};
```

> **Note:** this option disables Webpack config auto load.

#### `verbose`

Type: `Boolean`, default: `false`

Print debug information. Same as `--verbose` command line switch.

#### `webpackConfig`

Type: `Object` or `Function`, optional

Custom webpack config options: loaders, extensions, plugins, etc. required for your project.

Can be an object:

```javascript
module.exports = {
  webpackConfig: {
    module: {
      resolve: {
        extensions: ['.es6'],
      },
      loaders: [
        {
          test: /\.scss$/,
          loaders: ['style-loader', 'css-loader', 'sass-loader?precision=10'],
        },
      ],
    },
  },
};
```

Or a function:

```javascript
module.exports = {
  webpackConfig(env) {
    if (env === 'development') {
        return {
            // custom options
        };
    }
    return {};
  },
};
```

> **Note:**: `output` option will be ignored.

> **Note:** this option disables Webpack config auto load, use `webpackConfigFile` option to load your project’s Webpack config from file.

> **Note:** run style guide in verbose mode to see the actual Webpack config used by Styleguidist: `npm run styleguide -- --verbose`.

See [FAQ](./FAQ.md) for examples.

#### `webpackConfigFile`

Type: `String`

By default Styleguidist will try to find webpack config (`webpack.config.dev.js` or `webpack.config.js`) anywhere in your project and use it. Use this option to specify a custom path to your webpack config.

> **Note:**: `entry`, `externals` and `output` options will be ignored, use `webpackConfig` option to change them.
