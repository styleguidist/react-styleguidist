# Cookbook

## How to use `ref`s in examples?

Use `ref` prop as a function and assign a reference to a local variable:

```jsx
initialState = { value: '' };
let textarea;
<div>
  <Button onClick={() => textarea.insertAtCursor('Pizza')}>Insert</Button>
  <Textarea value={state.value} onChange={e => setState({ value: e.target.value })} ref={ref => textarea = ref} />
</div>
```

## How to exclude some components from style guide?

Styleguidist will ignore tests (`__tests__` folder and file names containing `.test.js` or `.spec.js`) by default.

Use [ignore](Configuration.md#ignore) option to customize this behavior:

```javascript
module.exports = {
  ignore: [
    '**/*.spec.js',
    'src/components/Button.js'
  ]
};
```

## How to hide some components in style guide but make them available in examples?

Enable [skipComponentsWithoutExample](Configuration.md#skipcomponentswithoutexample) option and do not add example file (`Readme.md` by default) to components you want to ignore.

Require these components in your examples:

```jsx
const Button = require('../common/Button');
<Button>Push Me Tender</Button>
```

## How to add custom JavaScript and CSS or polyfills?

In your style guide config:

```javascript
const path = require('path');
module.exports = {
  require: [
    'babel-polyfill',
    path.join(__dirname, 'path/to/script.js'),
    path.join(__dirname, 'path/to/styles.css'),
  ]
};
```

## How to use React Styleguidist with Preact?

You need to alias `react` and `react-dom` to `preact-compat`:

```javascript
module.exports = {
  webpackConfig: {
    resolve: {
      alias: {
        'react': 'preact-compat',
        'react-dom': 'preact-compat',
      }
    }
  }
};
```

See the [Preact example style guide](https://github.com/styleguidist/react-styleguidist/tree/master/examples/preact).

## How to change styles of a style guide?

Use config option [theme](Configuration.md#theme) to change fonts, colors, etc. and option [styles](Configuration.md#styles) to tweak style of particular Styleguidist’s components:

```javascript
module.exports = {
  theme: {
    color: {
      link: 'firebrick',
      linkHover: 'salmon',
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
};
```

> **Note:** See available [theme variables](https://github.com/styleguidist/react-styleguidist/blob/master/src/styles/theme.js).

> **Note:** Styles use [JSS](https://github.com/cssinjs/jss/blob/master/docs/json-api.md) with these plugins: [jss-isolate](https://github.com/cssinjs/jss-isolate), [jss-nested](https://github.com/cssinjs/jss-nested), [jss-camel-case](https://github.com/cssinjs/jss-camel-case), [jss-default-unit](https://github.com/cssinjs/jss-default-unit), [jss-compose](https://github.com/cssinjs/jss-compose).

> **Note:** Use [React Developer Tools](https://github.com/facebook/react-devtools) to find component and style names. For example a component `<LogoRenderer><h1 className="logo-524678444">…` corresponds to an example above.

## How to change the layout of a style guide?

You can replace any Styleguidist React component. But in most of the cases you’ll want to replace `*Renderer` components — all HTML is rendered by these components. For example `ReactComponentRenderer`, `ComponentsListRenderer`, `PropsRenderer`, etc. — [check the source](https://github.com/styleguidist/react-styleguidist/tree/master/src/rsg-components) to see what components are available.

There’s also a special wrapper component — `Wrapper` — that wraps every example component. By default it just renders `children` as is but you can use it to provide a custom logic.

For example you can replace the `Wrapper` component to wrap any example in the [React Intl’s](https://github.com/yahoo/react-intl) provider component. You can’t wrap the whole style guide because every example is compiled separately in a browser.

```javascript
// styleguide.config.js
const path = require('path');
module.exports = {
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'lib/styleguide/Wrapper')
  }
};
```

```jsx
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

You can replace the `StyleGuideRenderer` component like this:

```javascript
// styleguide.config.js
const path = require('path');
module.exports = {
  styleguideComponents: {
    StyleGuideRenderer: path.join(__dirname, 'lib/styleguide/StyleGuideRenderer')
  }
};
```

```jsx
// lib/styleguide/StyleGuideRenderer.js
import React from 'react';
const StyleGuideRenderer = ({ title, homepageUrl, components, toc, hasSidebar }) => (
  <div className="root">
    <h1>{title}</h1>
    <main className="wrapper">
      <div className="content">
        {components}
        <footer className="footer">
          <Markdown text={`Generated with [React Styleguidist](${homepageUrl})`} />
        </footer>
      </div>
      {hasSidebar &&
        <div className="sidebar">
          {toc}
        </div>
      }
    </main>
  </div>
);
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
          chunkOrigins: false,
        },
      };
    }
    return {};
  }
};
```

## How to debug my components and examples?

1. Open your browser’s developer tools
2. Write `debugger;` statement wherever you want: in a component source, a Markdown example or even in an editor in a browser.

![](https://d3vv6lp55qjaqc.cloudfront.net/items/3i3E3j2h3t1315141k0o/debugging.png)

## How to debug the exceptions thrown from my components?

1. Put `debugger;` statement at the beginning of your code.
2. Press the ![Debugger](https://d3vv6lp55qjaqc.cloudfront.net/items/2h2q3N123N3G3R252o41/debugger.png) button in your browser’s developer tools.
3. Press the ![Continue](https://d3vv6lp55qjaqc.cloudfront.net/items/3b3c1P3g3O1h3q111I2l/continue.png) button and the debugger will stop execution at the next exception.

## Why does the style guide list one of my prop types as `unknown`?

This occurs when you are assigning props via `getDefaultProps` that are not listed within the components `propTypes`.

For example, the color prop here is assigned via `getDefaultProps` but missing from the `propTypes`, therefore the style guide is unable to display the correct prop type.

```javascript
Button.propTypes = {
  children: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'normal', 'large'])
};

Button.defaultProps = {
  color: '#333',
  size: 'normal'
};
```

## Why object references don’t work in example component state?

Object references will not work as expected in examples state due to how the examples code is evaluated:

```jsx
const items = [
  {id: 0},
  {id: 1}
];

initialState = {
  activeItemByReference: items[0],
  activeItemByPrimitive: items[0].id
};

<div>
  {/* Will render "not active" because of object reference: */}
  {state.activeItemByReference === items[0] ? 'active' : 'not active'}
  {/* But this will render "active" as expected: */}
  {state.activeItemByPrimitive === items[0].id ? 'active' : 'not active'}
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

## How to reuse project’s webpack config?

See in [configuring webpack](Webpack.md#reusing-your-projects-webpack-config).

## How to use React Styleguidist with Redux, Relay or Styled Components?

See [working with third-party libraries](Thirdparties.md).

## Are there any other projects like this?

* [Atellier](https://github.com/scup/atellier), a React components emulator.
* [Carte Blanche](https://github.com/carteb/carte-blanche), an isolated development space with integrated fuzz testing for your components.
* [Catalog](https://github.com/interactivethings/catalog), create living style guides using Markdown or React.
* [Cosmos](https://github.com/react-cosmos/react-cosmos), a tool for designing truly encapsulated React components.
* [React BlueKit](http://bluekit.blueberry.io/), render React components with editable source and live preview.
* [React Cards](https://github.com/steos/reactcards), devcards for React.
* [React Styleguide Generator](https://github.com/pocotan001/react-styleguide-generator), a React style guide generator.
* [React Storybook](https://storybooks.js.org/), isolate your React UI Component development from the main app.
* [React-demo](https://github.com/rpominov/react-demo), a component for creating demos of other components with props editor.
* [SourceJS](https://github.com/sourcejs/Source), a platform to unify all your frontend documentation. It has a [Styleguidist plugin](https://github.com/sourcejs/sourcejs-react-styleguidist).
