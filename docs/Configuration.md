# Configuration

By default, Styleguidist will look for `styleguide.config.js` file in your project’s root folder. You can change the location of the config file using `--config` [CLI](CLI.md) option.

#### `assetsDir`

Type: `String`, optional

Your application static assets folder, will be accessible as `/` in the style guide dev server.

#### `compilerConfig`

Type: `Object`, default: `{ objectAssign: 'Object.assign' }`

Styleguidist uses [Bublé](https://buble.surge.sh/guide/) to run ES6 code on the frontend. This config object will be added as the second argument for `buble.transform`.

#### `components`

Type: `String` or `Function`, default: `src/components/**/*.{js,jsx}`

- when `String`: a [glob pattern](https://github.com/isaacs/node-glob#glob-primer) that matches all your component modules.
- when `Function`: a function that returns an array of module paths.

All paths are relative to config folder.

See examples in the [Components section](Components.md#components).

#### `context`

Type: `Object`, optional

Modules that will be available for examples. You can use it for utility functions like Lodash or for data fixtures.

```javascript
module.exports = {
  context: {
    map: 'lodash/map',
    users: './fixtures/users'
  }
};
```

Then you can use them in any example:

```jsx
<Message>{map(users, 'name').join(', ')}</Message>
```

#### `contextDependencies`

Type: `String[]`, optional

Array of absolute paths that allow you to specify absolute paths of directories to watch for additions or removals of components.

By default Styleguidist uses common parent directory of your components.

```javascript
module.exports = {
  contextDependencies: [
    path.resolve(__dirname, 'lib/components')
  ]
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
  }
};
```

Your components will be able to invoke the url `http://localhost:6060/custom-endpoint` from their examples.

#### `dangerouslyUpdateWebpackConfig`

Type: `Function`, optional

> **Warning:** You may easily break Styleguidist using this options, try to use [webpackConfig](#webpackconfig) option instead.

Allows you to modify webpack config without any restrictions.

```javascript
module.exports = {
  dangerouslyUpdateWebpackConfig(webpackConfig, env) {
    // WARNING: inspect Styleguidist Webpack config before modifying it, otherwise you may break Styleguidist
    console.log(webpackConfig);
    webpackConfig.externals = {
        jquery: 'jQuery'
    };
    return webpackConfig;
  }
};
```

#### `defaultExample`

Type: `Boolean` or `String`, default: `false`

For components that do not have an example, a default one can be used. When set to `true`, the [DefaultExample.md](https://github.com/styleguidist/react-styleguidist/blob/master/scripts/templates/DefaultExample.md) is used, or you can provide the path to your own example Markdown file.

When writing your own default example file, `__COMPONENT__` will be replaced by the actual component name at compile-time.

#### `getComponentPathLine`

Type: `Function`, default: component file name

Function that returns a component path line (displayed under the component name).

For example, instead of `components/Button/Button.js` you can print `import Button from 'components/Button';`:

```javascript
const path = require('path');
module.exports = {
  getComponentPathLine(componentPath) {
    const name = path.basename(componentPath, '.js');
    const dir = path.dirname(componentPath);
    return `import ${name} from '${dir}';`;
  }
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
  }
};
```

#### `handlers`

Type: `Function`, optional, default: [[react-docgen-displayname-handler](https://github.com/nerdlabs/react-docgen-displayname-handler)]

Function that returns functions used to process the discovered components and generate documentation objects. Default behaviors include discovering component documentation blocks, prop types, and defaults. If setting this property, it is best to build from the default `react-docgen` handler list, such as in the example below. See the [react-docgen handler documentation](https://github.com/reactjs/react-docgen#handlers) for more information about handlers.

Also note that the default handler, `react-docgen-displayname-handler` should be included to better support higher order components.

```javascript
module.exports = {
  handlers: componentPath => require('react-docgen').defaultHandlers.concat(
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
    require('react-docgen-displayname-handler').createDisplayNameHandler(componentPath),
  )
};
```

#### `highlightTheme`

Type: `String`, default: `base16-light`

[CodeMirror theme](http://codemirror.net/demo/theme.html) name to use for syntax highlighting in the editor.

#### `ignore`

Type: `String[]`, default: `['**/__tests__/**', '**/*.test.js', '**/*.test.jsx', '**/*.spec.js', '**/*.spec.jsx']`

Array of [glob pattern](https://github.com/isaacs/node-glob#glob-primer) or files of components that should not be included in the style guide.

#### `logger`

Type: `Object`, by default will use `console.*` in CLI or nothing in Node API

Custom logger functions:

```javascript
module.exports = {
	logger: {
    // One of: info, debug, warn
    // Suppress messages
		info: () => {},
    // Override display function
		warn: message => console.warn(`NOOOOOO: ${message}`),
	},
};
```

#### `previewDelay`

Type: `Number`, default: 500

Debounce time in milliseconds used before render the changes from the editor. While typing code the preview will not be updated.

#### `propsParser`

Type: `Function`, optional

Function that allows you to override the mechanism used to parse props from a source file. Default mechanism is using [react-docgen](https://github.com/reactjs/react-docgen) to parse props.

```javascript
module.exports = {
  propsParser(filePath, source, resolver, handlers) {
    return require('react-docgen').parse(source, resolver, handlers);
  }
};
```

#### `require`

Type: `String[]`, optional

Modules that are required for your style guide. Useful for third-party styles or polyfills.

```javascript
module.exports = {
  require: [
    'babel-polyfill',
    'path/to/styles.css',
  ]
};
```

#### `resolver`

Type: `Function`, optional

Function that allows you to override the mechanism used to identify classes/components to analyze. Default behavior is to find all exported components in each file. You can configure it to find all components or use a custom detection method. See the [react-docgen resolver documentation](https://github.com/reactjs/react-docgen#resolver) for more information about resolvers.

```javascript
module.exports = {
  resolver: require('react-docgen').resolver.findAllComponentDefinitions
};
```

#### `sections`

Type: `Array`, optional

Allows components to be grouped into sections with a title and overview content. Sections can also be content only, with no associated components (for example, a textual introduction). Sections can be nested.

See examples in the [Sections section](Components.md#sections).

#### `serverHost`

Type: `String`, default: `0.0.0.0`

Dev server host name.

#### `serverPort`

Type: `Number`, default: `6060`

Dev server port.

#### `showCode`

Type: `Boolean`, default: `false`

Show or hide example code initially. It can be toggled in the UI by clicking the the Code button after each example.

#### `showUsage`

Type: `Boolean`, default: `false`

Show or hide props and methods documentation initially. It can be toggled in the UI by clicking the Props & methods button after each component description.

#### `showSidebar`

Type: `Boolean`, default: `true`

Toggle sidebar visibility. Sidebar will be hidden when opening components or examples in isolation mode even if this value is set to `true`. When set to `false`, sidebar will always be hidden.

#### `skipComponentsWithoutExample`

Type: `Boolean`, default: `false`

Ignore components that don’t have an example file (as determined by `getExampleFilename`). These components won’t be accessible from other examples unless you manually `require` them.

#### `styleguideComponents`

Type: `Object`, optional

Override React components used to render the style guide.

```javascript
module.exports = {
	styleguideComponents: {
		Logo: path.join(__dirname, 'styleguide/components/Logo'),
		StyleGuideRenderer: path.join(__dirname, 'styleguide/components/StyleGuide'),
	},
};
```

See an example of [customized style guide](https://github.com/styleguidist/react-styleguidist/tree/master/examples/customised).

#### `styleguideDir`

Type: `String`, default: `styleguide`

Folder for static HTML style guide generated with `styleguidist build` command.

#### `styles`

Type: `object`, optional

Customize styles of any Styleguidist’s component.

See example in the [cookbook](Cookbook.md#how-to-change-styles-of-a-style-guide).

#### `template`

Type: `String`, default: [src/templates/index.html](https://github.com/styleguidist/react-styleguidist/blob/master/scripts/templates/index.html)

HTML file to use as the template for the style guide. HTML webpack Plugin is used under the hood, see [their docs for details](https://github.com/jantimon/html-webpack-plugin/blob/master/docs/template-option.md).

#### `theme`

Type: `object`, optional

Customize style guide UI fonts, colors, etc.

See example in the [cookbook](Cookbook.md#how-to-change-styles-of-a-style-guide).

#### `title`

Type: `String`, default: `<app name from package.json> Style Guide`

Style guide title.

#### `updateExample`

Type: `Function`, optional

Function that modifies code example (Markdown fenced code block). For example you can use it to load examples from files:

```javascript
module.exports = {
  updateExample: function(props) {
    const { settings, lang } = props;
    if (typeof settings.file === 'string') {
      const filepath = settings.file;
      delete settings.file;
      return {
        content: fs.readFileSync(filepath),
        settings,
        lang,
      }
    }
    return props;
  }
};
```

Use it like this in you Markdown files:

```md
\`\`\`js { "file": "./some/file.js" }
\`\`\`
```

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
        extensions: ['.es6']
      },
      loaders: [
        {
          test: /\.scss$/,
          loaders: ['style-loader', 'css-loader', 'sass-loader?precision=10']
        }
      ]
    }
  }
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
  }
};
```

> **Warning:** This option disables config load from `webpack.config.js`, load your config [manually](Webpack.md#reusing-your-projects-webpack-config).

> **Note:** `entry`, `externals`, `output`, `watch`, `stats` and `devtool` options will be ignored.

> **Note:** `CommonsChunkPlugins`, `HtmlWebpackPlugin`, `UglifyJsPlugin`, `HotModuleReplacementPlugin` plugins will be ignored because Styleguidist already includes them or they may break Styleguidist.

> **Note:** Run style guide in verbose mode to see the actual webpack config used by Styleguidist: `npm run styleguide -- --verbose`.

See [Configuring webpack](Webpack.md) for examples.
