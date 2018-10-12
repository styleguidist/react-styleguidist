# Cookbook

<!-- To update run: npx markdown-toc --maxdepth 2 -i docs/Cookbook.md -->

<!-- toc -->

- [How to use `ref`s in examples?](#how-to-use-refs-in-examples)
- [How to exclude some components from style guide?](#how-to-exclude-some-components-from-style-guide)
- [How to hide some components in style guide but make them available in examples?](#how-to-hide-some-components-in-style-guide-but-make-them-available-in-examples)
- [How to render React components that aren’t part of the style guide?](#how-to-render-react-components-that-arent-part-of-the-style-guide)
- [How to dynamically load other components in an example?](#how-to-dynamically-load-other-components-in-an-example)
- [How to display the source code of any file?](#how-to-display-the-source-code-of-any-file)
- [How to set global styles for user components?](#how-to-set-global-styles-for-user-components)
- [How to add custom JavaScript and CSS or polyfills?](#how-to-add-custom-javascript-and-css-or-polyfills)
- [How to use React Styleguidist with Preact?](#how-to-use-react-styleguidist-with-preact)
- [How to change styles of a style guide?](#how-to-change-styles-of-a-style-guide)
- [How to change the layout of a style guide?](#how-to-change-the-layout-of-a-style-guide)
- [How to change style guide dev server logs output?](#how-to-change-style-guide-dev-server-logs-output)
- [How to debug my components and examples?](#how-to-debug-my-components-and-examples)
- [How to debug the exceptions thrown from my components?](#how-to-debug-the-exceptions-thrown-from-my-components)
- [How to use production or development build of React?](#how-to-use-production-or-development-build-of-react)
- [Why object references don’t work in example component state?](#why-object-references-dont-work-in-example-component-state)
- [How to use Vagrant with Styleguidist?](#how-to-use-vagrant-with-styleguidist)
- [How to add a favicon?](#how-to-add-a-favicon)
- [How to add external JavaScript and CSS files?](#how-to-add-external-javascript-and-css-files)
- [How to add fonts from Google Fonts?](#how-to-add-fonts-from-google-fonts)
- [How to reuse project’s webpack config?](#how-to-reuse-projects-webpack-config)
- [How to use React Styleguidist with Redux, Relay or Styled Components?](#how-to-use-react-styleguidist-with-redux-relay-or-styled-components)
- [How to change the names of components displayed in Styleguidist UI?](#how-to-change-the-names-of-components-displayed-in-styleguidist-ui)
- [What’s the difference between Styleguidist and Storybook?](#whats-the-difference-between-styleguidist-and-storybook)
- [Are there any other projects like this?](#are-there-any-other-projects-like-this)

<!-- tocstop -->

## How to use `ref`s in examples?

Use `ref` prop as a function and assign a reference to a local variable:

```jsx
initialState = { value: '' }
let textarea
;<div>
  <Button onClick={() => textarea.insertAtCursor('Pizza')}>
    Insert
  </Button>
  <Textarea
    value={state.value}
    onChange={e => setState({ value: e.target.value })}
    ref={ref => (textarea = ref)}
  />
</div>
```

## How to exclude some components from style guide?

Styleguidist will ignore tests (`__tests__` folder and filenames containing `.test.js` or `.spec.js`) by default.

Use [ignore](Configuration.md#ignore) option to customize this behavior:

```javascript
module.exports = {
  ignore: ['**/*.spec.js', '**/components/Button.js']
}
```

> **Note:** You should pass glob patterns, for example, use `**/components/Button.js` instead of `components/Button.js`.

## How to hide some components in style guide but make them available in examples?

Enable [skipComponentsWithoutExample](Configuration.md#skipcomponentswithoutexample) option and do not add example file (`Readme.md` by default) to components you want to ignore.

Require these components in your examples:

```jsx
const Button = require('../common/Button')
;<Button>Push Me Tender</Button>
```

Or, to make these components available for all examples:

```jsx
// styleguide.config.js
module.exports = {
  require: [path.resolve(__dirname, 'styleguide/setup.js')]
}

// styleguide/setup.js
import Button from './src/components/common/Button'
global.Button = Button
```

The `Button` component will be available in every example without a need to `require` it.

## How to render React components that aren’t part of the style guide?

Require these components in your examples:

    ```jsx noeditor
    const ColorPalette = require('./components/ColorPalette').default
    ;<ColorPalette />
    ```

## How to dynamically load other components in an example?

Although examples don’t have direct access to webpack’s `require.context` feature, you _can_ use it in a separate helper file which you require in your example code. If you wanted to create an example to load and show all your icon components, you could do this:

```js
// load-icons.js
const iconsContext = require.context('./icons/', true, /js$/)
const icons = iconsContext.keys().reduce((icons, file) => {
  const Icon = iconsContext(file).default
  const label = file.slice(2, -3) // strip './' and '.js'
  icons[label] = Icon
  return icons
}, {})

export default icons
```

````markdown
// IconGallery.md

```jsx noeditor
const icons = require('./load-icons').default

const iconElements = Object.keys(icons).map(iconName => {
  const Icon = icons[iconName]
  return (
    <span key={iconName}>
      {iconName}: {<Icon />}
    </span>
  )
})
<div>{iconElements}</div>
```
````

## How to display the source code of any file?

First, code examples can receive [props and settings](Documenting.md#usage-examples-and-readme-files):

    ```js { "file": "../mySourceCode.js" }
    ```

The above example adds a setting called `file` with the **relative path** to the file we want to display as value.

Second, use the [updateExample](Configuration#updateexample) config option, to detect the setting and change the content of a fenced code block:

```javascript
module.exports = {
  updateExample(props, exampleFilePath) {
    // props.settings are passed by any fenced code block, in this case
    const { settings, lang } = props
    // "../mySourceCode.js"
    if (typeof settings.file === 'string') {
      // "absolute path to mySourceCode.js"
      const filepath = path.resolve(exampleFilePath, settings.file)
      // displays the block as static code
      settings.static = true
      // no longer needed
      delete settings.file
      return {
        content: fs.readFileSync(filepath, 'utf8'),
        settings,
        lang
      }
    }
    return props
  }
}
```

## How to set global styles for user components?

Using the [jss-global](https://github.com/cssinjs/jss-global) API you can set global styles in your config:

```javascript
module.exports = {
  components: 'src/components/**/[A-Z]*.js',
  styles: {
    StyleGuide: {
      '@global body': {
        fontFamily: 'Helvetica'
      }
    }
  }
}
```

Above, we have set `font-family: 'Helvetica';` on the body.

> **Note:** This does not set styles on the style guide UI, for that read [How to change styles of a style guide](#how-to-change-styles-of-a-style-guide).

## How to add custom JavaScript and CSS or polyfills?

In your style guide config:

```javascript
const path = require('path')
module.exports = {
  require: [
    'babel-polyfill',
    path.join(__dirname, 'path/to/script.js'),
    path.join(__dirname, 'path/to/styles.css')
  ]
}
```

## How to use React Styleguidist with Preact?

You need to alias `react` and `react-dom` to `preact-compat`:

```javascript
module.exports = {
  webpackConfig: {
    resolve: {
      alias: {
        react: 'preact-compat',
        'react-dom': 'preact-compat'
      }
    }
  }
}
```

See the [Preact example style guide](https://github.com/styleguidist/react-styleguidist/tree/master/examples/preact).

## How to change styles of a style guide?

There are two config options to change your style guide UI: [theme](Configuration.md#theme) and [styles](Configuration.md#styles).

Use [theme](Configuration.md#theme) to change fonts, colors, etc.

Use [styles](Configuration.md#styles) to tweak the style of any particular Styleguidist component.

As an example:

```javascript
module.exports = {
  theme: {
    color: {
      link: 'firebrick',
      linkHover: 'salmon'
    },
    fontFamily: {
      base: '"Comic Sans MS", "Comic Sans", cursive'
    }
  },
  styles: {
    Logo: {
      logo: {
        animation: 'blink ease-in-out 300ms infinite'
      },
      '@keyframes blink': {
        to: { opacity: 0 }
      }
    }
  }
}
```

> **Note:** See available [theme variables](https://github.com/styleguidist/react-styleguidist/blob/master/src/styles/theme.js).

> **Note:** Styles use [JSS](https://github.com/cssinjs/jss/blob/master/docs/json-api.md) with these plugins: [jss-isolate](https://github.com/cssinjs/jss-isolate), [jss-nested](https://github.com/cssinjs/jss-nested), [jss-camel-case](https://github.com/cssinjs/jss-camel-case), [jss-default-unit](https://github.com/cssinjs/jss-default-unit), [jss-compose](https://github.com/cssinjs/jss-compose) and [jss-global](https://github.com/cssinjs/jss-global).

> **Note:** Use [React Developer Tools](https://github.com/facebook/react-devtools) to find component and style names. For example a component `<LogoRenderer><h1 className="logo-524678444">…` corresponds to an example above.

## How to change the layout of a style guide?

You can replace any Styleguidist React component. But in most of the cases you’ll want to replace `*Renderer` components — all HTML is rendered by these components. For example `ReactComponentRenderer`, `ComponentsListRenderer`, `PropsRenderer`, etc. — [check the source](https://github.com/styleguidist/react-styleguidist/tree/master/src/rsg-components) to see what components are available.

There’s also a special wrapper component — `Wrapper` — that wraps every example component. By default it just renders `children` as is but you can use it to provide a custom logic.

For example you can replace the `Wrapper` component to wrap any example in the [React Intl’s](https://github.com/yahoo/react-intl) provider component. You can’t wrap the whole style guide because every example is compiled separately in a browser.

```javascript
// styleguide.config.js
const path = require('path')
module.exports = {
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'lib/styleguide/Wrapper')
  }
}
```

```jsx
// lib/styleguide/Wrapper.js
import React, { Component } from 'react'
import { IntlProvider } from 'react-intl'
export default class Wrapper extends Component {
  render() {
    return (
      <IntlProvider locale="en">{this.props.children}</IntlProvider>
    )
  }
}
```

You can replace the `StyleGuideRenderer` component like this:

```javascript
// styleguide.config.js
const path = require('path')
module.exports = {
  styleguideComponents: {
    StyleGuideRenderer: path.join(
      __dirname,
      'lib/styleguide/StyleGuideRenderer'
    )
  }
}
```

```jsx
// lib/styleguide/StyleGuideRenderer.js
import React from 'react'
const StyleGuideRenderer = ({
  title,
  version,
  homepageUrl,
  components,
  toc,
  hasSidebar
}) => (
  <div className="root">
    <h1>{title}</h1>
    {version && <h2>{version}</h2>}
    <main className="wrapper">
      <div className="content">
        {components}
        <footer className="footer">
          <Markdown
            text={`Generated with [React Styleguidist](${homepageUrl})`}
          />
        </footer>
      </div>
      {hasSidebar && <div className="sidebar">{toc}</div>}
    </main>
  </div>
)
```

We have [an example style guide](https://github.com/styleguidist/react-styleguidist/tree/master/examples/customised) with custom components.

## How to change style guide dev server logs output?

You can modify webpack dev server logs format changing `stats` option of webpack config:

```javascript
module.exports = {
  webpackConfig(env) {
    if (env === 'development') {
      return {
        stats: {
          chunks: false,
          chunkModules: false,
          chunkOrigins: false
        }
      }
    }
    return {}
  }
}
```

## How to debug my components and examples?

1.  Open your browser’s developer tools
2.  Write `debugger;` statement wherever you want: in a component source, a Markdown example or even in an editor in a browser.

![](https://d3vv6lp55qjaqc.cloudfront.net/items/3i3E3j2h3t1315141k0o/debugging.png)

## How to debug the exceptions thrown from my components?

1.  Put `debugger;` statement at the beginning of your code.
2.  Press the ![Debugger](https://d3vv6lp55qjaqc.cloudfront.net/items/2h2q3N123N3G3R252o41/debugger.png) button in your browser’s developer tools.
3.  Press the ![Continue](https://d3vv6lp55qjaqc.cloudfront.net/items/3b3c1P3g3O1h3q111I2l/continue.png) button and the debugger will stop execution at the next exception.

## How to use production or development build of React?

In some cases, you might need to use development build of React instead of the default [production one](https://reactjs.org/docs/optimizing-performance.html#use-the-production-build). For example, this might be needed if you use React Native and make references to a React Native component’s PropTypes in your code. As React removes all PropTypes in its production build, your code will fail. By default, Styleguidist uses the development build for the dev server, and the production one for static builds.

```js
import React from 'react'
import { TextInput } from 'react-native'

const CustomInput = ({ value }) => <TextInput value={value} />

CustomInput.propTypes = {
  // Will fail in a static build
  value: TextInput.value.isRequired
}
```

If you use code like the example above, you might see a `Cannot read property 'isRequired' of undefined` error. To avoid it, you need to tell Styleguidist to use React’s development build. To do this, set the `NODE_ENV` variable to `development` in your npm script.

```json
{
  "scripts": {
    "build": "cross-env NODE_ENV=development react-styleguidist build"
  }
}
```

**Note:** The script above uses [cross-env](https://github.com/kentcdodds/cross-env) to make sure the environment variable is properly set on all platforms. Run `npm i -D cross-env` to add it.

## Why object references don’t work in example component state?

Object references may not work as expected in examples state:

```jsx
const items = [{ id: 0 }, { id: 1 }]

initialState = {
  activeItemByReference: items[0],
  activeItemByPrimitive: items[0].id
}
;<div>
  {/* Will render "not active" because of object reference: */}
  {state.activeItemByReference === items[0] ? 'active' : 'not active'}
  {/* But this will render "active" as expected: */}
  {state.activeItemByPrimitive === items[0].id
    ? 'active'
    : 'not active'}
</div>
```

## How to use Vagrant with Styleguidist?

First read [Vagrant guide](https://webpack.js.org/guides/development-vagrant/) from the webpack documentation. Then enable polling in your webpack config:

```js
devServer: {
  watchOptions: {
    poll: true
  }
}
```

## How to add a favicon?

Two options:

1.  Put a `favicon.ico` file into the root folder of your site.

2.  Use [template](Configuration.md#template) option:

```javascript
module.exports = {
  template: {
    favicon: 'https://assets-cdn.github.com/favicon.ico'
  }
}
```

## How to add external JavaScript and CSS files?

Use [template](Configuration.md#template) option:

```javascript
module.exports = {
  template: {
    head: {
      scripts: [
        {
          src: 'assets/js/babelHelpers.min.js'
        }
      ],
      links: [
        {
          rel: 'stylesheet',
          href:
            'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'
        }
      ]
    }
  }
}
```

In comparison to [require](Configuration.md#require) option, these scripts and links are run in the browser, not during webpack build process. It can be useful for side effect-causing scripts which your components, or in this case Babel output, need to function properly.

## How to add fonts from Google Fonts?

Use [template](Configuration.md#template) and [theme](Configuration.md#theme) options:

```javascript
module.exports = {
  template: {
    head: {
      links: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Roboto'
        }
      ]
    }
  },
  theme: {
    fontFamily: {
      base: '"Roboto", sans-serif'
    }
  }
}
```

## How to reuse project’s webpack config?

See in [configuring webpack](Webpack.md#reusing-your-projects-webpack-config).

## How to use React Styleguidist with Redux, Relay or Styled Components?

See [working with third-party libraries](Thirdparties.md).

## How to change the names of components displayed in Styleguidist UI?

You might want to change your components’ names to be displayed differently, for example, for stylistic purposes or to give them a more descriptive names in your style guide.

This can be done by adding [@visibleName](Documenting.md#defining-custom-component-names) tag to your component documentation.

In case you want to change components’ names in bulk, for example, based on their current name, you can use [updateDocs](Configuration.md#updatedocs) config option:

```javascript
module.exports = {
  updateDocs(docs) {
    if (docs && docs.displayName) {
      docs.visibleName = docs.displayName.toLowerCase()
    }
    return docs
  }
}
```

## What’s the difference between Styleguidist and Storybook?

Both tools are good and mature, they have many similarities but also some distinctions that may make you choose one or the other. For me the biggest distinction is how you describe component variations.

With [Storybook](https://storybook.js.org/) you write _stories_ in JavaScript files:

```js
import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Button from '../components/Button'

storiesOf('Button', module)
  .add('default', () => (
    <Button onClick={action('clicked')}>Push Me</Button>
  ))
  .add('large size', () => <Button size="large">Push Me</Button>)
```

![Storybook screenshot](https://storybook.js.org/static/demo.f13d28a7.gif)

And with Styleguidist you write _examples_ in Markdown files:

    React button component example:

    ```js
    <Button onClick={() => console.log('clicked')>Push Me</Button>
    ```

    Large size:

    ```js
    <Button size="large">Push Me</Button>
    ```

![Styleguidist screenshot](https://camo.githubusercontent.com/7af8e5fc43288807978f28530656275008c5afbf/68747470733a2f2f64337676366c703535716a6171632e636c6f756466726f6e742e6e65742f6974656d732f32373142333732783130325330633035326933462f72656163742d7374796c6567756964697374372e676966)

Another important distinction is that Storybook shows only one variation of one component at a time but Styleguidist can show all variations of all components, all variations of a single component or one variation. It’s easier to create a style guide with Styleguidist but Storybook has more tools to develop components (though we’re working on that too).

| Feature              | Storybook  | Styleguidist                                                                      |
| -------------------- | ---------- | --------------------------------------------------------------------------------- |
| Component examples   | JavaScript | Markdown                                                                          |
| Props docs           | Yes        | Yes                                                                               |
| Public methods docs  | No         | Yes                                                                               |
| Style guide¹         | No         | Yes                                                                               |
| Customizable design  | No         | Yes                                                                               |
| Extra documentation² | No         | Yes                                                                               |
| Plugins              | Many       | [In development](https://github.com/styleguidist/react-styleguidist/issues/354)   |
| React                | Yes        | Yes                                                                               |
| Preact               | Yes        | Yes                                                                               |
| React Native         | Yes        | [react-native-web](https://github.com/styleguidist/react-styleguidist/issues/675) |
| Vue                  | Yes        | [Fork](https://github.com/vue-styleguidist/vue-styleguidist)                      |

¹ All components on a single page.<br> ² Include non-component documentation.

## Are there any other projects like this?

- [Atellier](https://github.com/scup/atellier), a React components emulator.
- [Carte Blanche](https://github.com/carteb/carte-blanche), an isolated development space with integrated fuzz testing for your components.
- [Catalog](https://github.com/interactivethings/catalog), create living style guides using Markdown or React.
- [Cosmos](https://github.com/react-cosmos/react-cosmos), a tool for designing encapsulated React components.
- [React BlueKit](http://bluekit.blueberry.io/), render React components with editable source and live preview.
- [React Cards](https://github.com/steos/reactcards), devcards for React.
- [React Styleguide Generator](https://github.com/pocotan001/react-styleguide-generator), a React style guide generator.
- [React Storybook](https://storybooks.js.org/), isolate your React UI Component development from the main app.
- [React-demo](https://github.com/rpominov/react-demo), a component for creating demos of other components with props editor.
- [SourceJS](https://github.com/sourcejs/Source), a platform to unify all your frontend documentation. It has a [Styleguidist plugin](https://github.com/sourcejs/sourcejs-react-styleguidist).
