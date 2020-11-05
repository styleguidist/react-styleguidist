# Cookbook

## How to use `ref`s in examples?

Use `ref` prop as a function and assign a reference to a local variable:

```jsx
const [value, setValue] = React.useState('')
let textarea
;<div>
  <Button onClick={() => textarea.insertAtCursor('Pizza')}>
    Insert
  </Button>
  <Textarea
    value={value}
    onChange={e => setValue(e.target.value)}
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

> **Caution:** You should pass glob patterns, for example, use `**/components/Button.js` instead of `components/Button.js`.

## How to hide some components in style guide but make them available in examples?

Enable [skipComponentsWithoutExample](Configuration.md#skipcomponentswithoutexample) option and do not add an example file (`Readme.md` by default) to components you want to ignore.

Import these components in your examples:

````jsx
// ```jsx inside Markdown
import Button from '../common/Button'
;<Button>Push Me Tender</Button>
````

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

The `Button` component will be available in every example without a need to `import` it.

## How to render React components that aren’t part of the style guide?

Import these components in your examples:

````jsx
// ```jsx or ```jsx noeditor inside Markdown
import ColorPalette from './components/ColorPalette'
;<ColorPalette />
````

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

````jsx
// ```jsx or ```jsx noeditor inside Markdown
import icons from './load-icons'
const iconElements = Object.keys(icons).map(iconName => {
  const Icon = icons[iconName]
  return (
    <span key={iconName}>
      {iconName}: {<Icon />}
    </span>
  )
})
<div>{iconElements}</div>
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

> **Tip:** This does not set styles on the style guide UI, for that read [How to change styles of a style guide](#how-to-change-styles-of-a-style-guide).

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
      // We're changing the LogoRenderer component
      logo: {
        // We're changing the rsg--logo-XX class name inside the component
        animation: '$blink ease-in-out 300ms infinite'
      },
      '@keyframes blink': {
        to: { opacity: 0 }
      }
    }
  }
}
```

> **Info:** See available [theme variables](https://github.com/styleguidist/react-styleguidist/blob/master/src/client/styles/theme.ts).

> **Info:** Styles use [JSS](https://github.com/cssinjs/jss/blob/master/docs/jss-syntax.md) with these plugins: [jss-isolate](https://github.com/cssinjs/jss/tree/master/packages/jss-plugin-isolate), [jss-nested](https://github.com/cssinjs/jss/tree/master/packages/jss-plugin-nested), [jss-camel-case](https://github.com/cssinjs/jss/tree/master/packages/jss-plugin-camel-case), [jss-default-unit](https://github.com/cssinjs/jss/tree/master/packages/jss-plugin-default-unit), [jss-compose](https://github.com/cssinjs/jss/tree/master/packages/jss-plugin-compose) and [jss-global](https://github.com/cssinjs/jss/tree/master/packages/jss-plugin-global).

> **Tip:** Use [React Developer Tools](https://github.com/facebook/react) to find component and style names. For example a component `<LogoRenderer><h1 className="rsg--logo-53">` corresponds to an example above.

> **Tip:** Use a function instead of an object for [styles](Configuration.md#styles) to access all theme variables in your custom styles.

You can store all styles in a separate file to allow hot module replacement (HMR). Same goes for theme variables.

The same example above would then translate as:

In `styleguide.config,js`, objects are replaced with file paths

```javascript
module.exports = {
  // ...
  styles: './styleguide/styles.js',
  theme: './styleguide/themes.js'
}
```

then in `./styleguide/theme.js`

```javascript
module.exports = {
  color: {
    link: 'firebrick',
    linkHover: 'salmon'
  },
  fontFamily: {
    base: '"Comic Sans MS", "Comic Sans", cursive'
  }
}
```

and in `./styleguide/styles.js`

```javascript
module.exports = {
  Logo: {
    // We're changing the LogoRenderer component
    logo: {
      // We're changing the rsg--logo-XX class name inside the component
      animation: '$blink ease-in-out 300ms infinite'
    },
    '@keyframes blink': {
      to: { opacity: 0 }
    }
  }
}
```

Each modification of `theme.js` or `styles.js` will trigger a hot module replacement, updating the styleguide in the browser.

Check out the [themed example](https://github.com/styleguidist/react-styleguidist/tree/master/examples/themed) on the github repo to learn more and try it out.

```javascript
module.exports = {
  styles: function (theme) {
    return {
      Logo: {
        logo: {
          // we can now change the color used in the logo item to use the theme's `link` color
          color: theme.color.link
        }
      }
    }
  }
}
```

## How to use CSS animations in your style guide?

As seen in the `@keyframes` animation examples above, the animation property in CSS rules do not directly use the name of their keyframe animations because of internal keyframe scoping.

To use a CSS animation, you have to define its keyframe at the root of the renderer object. The use of `@keyframes` in styling above are good examples of this.

## How to change the layout of a style guide?

You can replace any Styleguidist React component. But in most of the cases you’ll want to replace `*Renderer` components — all HTML is rendered by these components. For example `ReactComponentRenderer`, `ComponentsListRenderer`, `PropsRenderer`, etc. — [check the source](https://github.com/styleguidist/react-styleguidist/tree/master/src/client/rsg-components) to see what components are available.

There’s also a special wrapper component — `Wrapper` — that wraps every example component. By default, it renders `children` as is but you can use it to provide custom logic.

For example, you can replace the `Wrapper` component to wrap any example in the [React Intl’s](https://github.com/yahoo/react-intl) provider component. You can’t wrap the whole style guide because every example is compiled separately in a browser.

```javascript
// styleguide.config.js
const path = require('path')
module.exports = {
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'src/styleguide/Wrapper')
  }
}
```

```jsx
// src/styleguide/Wrapper.js
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
      'src/styleguide/StyleGuideRenderer'
    )
  }
}
```

```jsx
// src/styleguide/StyleGuideRenderer.js
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
            text={`Created with [React Styleguidist](${homepageUrl})`}
          />
        </footer>
      </div>
      {hasSidebar && <div className="sidebar">{toc}</div>}
    </main>
  </div>
)
```

We have [an example style guide](https://github.com/styleguidist/react-styleguidist/tree/master/examples/customised) with custom components.

## How to change syntax highlighting colors?

Styleguidist uses [Prism](https://prismjs.com/) for code highlighting in static examples and inside the editor. You can change the colors using the [theme](Configuration.md#theme) config option:

```javascript
// styleguide.config.js
module.exports = {
  theme: {
    color: {
      codeComment: '#6d6d6d',
      codePunctuation: '#999',
      codeProperty: '#905',
      codeDeleted: '#905',
      codeString: '#690',
      codeInserted: '#690',
      codeOperator: '#9a6e3a',
      codeKeyword: '#1673b1',
      codeFunction: '#DD4A68',
      codeVariable: '#e90'
    }
  }
}
```

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

1. Open your browser’s developer tools
2. Write `debugger;` statement wherever you want: in a component source, a Markdown example or even in an editor in a browser.

![](https://d3vv6lp55qjaqc.cloudfront.net/items/3i3E3j2h3t1315141k0o/debugging.png)

## How to debug the exceptions thrown from my components?

1. Put `debugger;` statement at the beginning of your code.
2. Press the ![Debugger](https://d3vv6lp55qjaqc.cloudfront.net/items/2h2q3N123N3G3R252o41/debugger.png) button in your browser’s developer tools.
3. Press the ![Continue](https://d3vv6lp55qjaqc.cloudfront.net/items/3b3c1P3g3O1h3q111I2l/continue.png) button and the debugger will stop execution at the next exception.

## How to use the production or development build of React?

In some cases, you might need to use the development build of React instead of the default [production one](https://reactjs.org/docs/optimizing-performance.html#use-the-production-build). For example, this might be needed if you use React Native and make references to a React Native component’s PropTypes in your code. As React removes all PropTypes in its production build, your code will fail. By default, Styleguidist uses the development build for the dev server and the production one for static builds.

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

## How to use Vagrant with Styleguidist?

First, read [Vagrant guide](https://webpack.js.org/guides/development-vagrant/) from the webpack documentation. Then enable polling in your webpack config:

```js
devServer: {
  watchOptions: {
    poll: true
  }
}
```

## How to add a favicon?

Two options:

1. Put a `favicon.ico` file into the root folder of your site.

2. Use [template](Configuration.md#template) option:

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

In comparison to [require](Configuration.md#require) option, these scripts and links are run in the browser, not during webpack build process. It can be useful for side effect-causing scripts in which your components, or in this case Babel output, need to function properly.

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

## How to use React-axe to test accessibility of components?

1. Install [react-axe](https://github.com/dequelabs/react-axe).

2. Load React-axe with the style guide and run checks for each example:

```jsx
// styleguide.config.js
module.exports = {
  require: [path.resolve(__dirname, 'styleguide/setup.js')]
}

// styleguide/setup.js
import React from 'react'
import ReactDOM from 'react-dom'
var context = {
  include: [['[data-preview]']]
}
if (process.env.NODE_ENV !== 'production') {
  var axe = require('react-axe')
  axe(React, ReactDOM, 1000, undefined, context)
}
```

3. [Start your style guide server](https://react-styleguidist.js.org/docs/getting-started#3-start-your-style-guide) and open your browser’s developer tools console.

If you are using Jest for testing you can also use [jest-axe](https://github.com/nickcolley/jest-axe).

## How to change the names of components displayed in Styleguidist UI?

You might want to change your components’ names to be displayed differently, for example, for stylistic purposes or to give them more descriptive names in your style guide.

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

## How to re-use the types in Styleguidist?

From version 10, Styleguidist is written using TypeScript language.

It allows the maintainers to catch type mismatch before execution and gives them a better developer experience.

It also allows you to write customized style guide components using TypeScript TSX instead of JavaScript JSX.

**NOTE:** Since all files in `src/client/rsg-components` are aliased to `rsg-components` using webpack, you will have to add this alias to your `tsconfig.json` file:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      // remap rsg-components/anything to its version in react-styleguidist
      "rsg-components/*": [
        "node_modules/react-styleguidist/lib/client/rsg-components/*"
      ]
    }
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

This way when you write the following component, TypeScript will resolve typings for client components and help you type them properly.

```ts
import Styled from 'rsg-components/Styled'
import Heading from 'rsg-components/Heading'

export default function SectionsRenderer({ children }) {
  return (
    <div>
      {children.length > 0 && (
        <div>
          <Heading level={1}>Example Components</Heading>
          <p>These are the greatest components</p>
        </div>
      )}
      <DefaultSectionsRenderer>{children}</DefaultSectionsRenderer>
    </div>
  )
}
```

## What’s the difference between Styleguidist and Storybook?

Both tools are good and mature, they have many similarities but also some distinctions that may make you choose one or the other. For me, the biggest distinction is how you describe component variations.

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

<video controls muted playsinline alt="Storybook demo video"><source src="https://storybook.js.org/videos/storybook-hero-video-optimized.mp4" type="video/mp4" /></video>

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

| Feature | Storybook | Styleguidist |
| --- | --- | --- |
| Component examples | JavaScript | Markdown |
| Props docs | Yes | Yes |
| Public methods docs | No | Yes |
| Style guide¹ | No | Yes |
| Customizable design | No | Yes |
| Extra documentation² | No | Yes |
| Plugins | Many | [In development](https://github.com/styleguidist/react-styleguidist/issues/354) |
| React | Yes | Yes |
| Preact | Yes | Yes |
| React Native | Yes | [react-native-web](https://github.com/styleguidist/react-styleguidist/issues/675) |
| Vue | Yes | [Fork](https://github.com/vue-styleguidist/vue-styleguidist) |

¹ All components on a single page.<br> ² Include non-component documentation.

## Are there any other projects like this?

### Active

- [Catalog](https://github.com/interactivethings/catalog), create living style guides using Markdown or React.
- [Cosmos](https://github.com/react-cosmos/react-cosmos), a tool for designing encapsulated React components.
- [Docz](https://www.docz.site/), a tool for documenting your components with zero configuration and live preview.
- [React Storybook](https://storybooks.js.org/), isolate your React UI Component development from the main app.

### Inactive

- [Atellier](https://github.com/scup/atellier), a React components emulator. Last release 2016.
- [Carte Blanche](https://github.com/carteb/carte-blanche), an isolated development space with integrated fuzz testing for your components. Last release 2016.
- [React BlueKit](http://bluekit.blueberry.io/), render React components with editable source and live preview. Last release 2017.
- [React Cards](https://github.com/steos/reactcards), devcards for React. Last release 2017.
- [React Styleguide Generator](https://github.com/pocotan001/react-styleguide-generator), a React style guide generator. Last release 2017.
- [React-demo](https://github.com/rpominov/react-demo), a component for creating demos of other components with props editor. Last release 2017.
- [SourceJS](https://github.com/sourcejs/Source), a platform to unify all your frontend documentation. It has a [Styleguidist plugin](https://github.com/sourcejs/sourcejs-react-styleguidist). On hold.
