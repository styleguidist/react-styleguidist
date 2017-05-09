# Cookbook

## How to reuse project’s webpack config?

See in [configuring webpack](Webpack.md#reusing-your-projects-webpack-config).

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

```javascript
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

## How to connect Redux store?

To use Redux store with one component require it from your example:

```javascript
const { Provider } = require('react-redux');
const configureStore = require('../utils/configureStore').default;
const initialState = {
  app: {
    name: 'Pizza Delivery'
  }
};
const store = configureStore({ initialState });
<Provider store={store}>
  <App greeting="Choose your pizza!"/>
</Provider>
```

To use Redux store in every component redefine the `Wrapper` component:

```javascript
// styleguide.config.js
const path = require('path');
module.exports = {
  webpackConfig: {
    resolve: {
      alias: {
        'rsg-components/Wrapper': path.join(__dirname, 'lib/styleguide/Wrapper')
      }
    }
  }
};

// lib/styleguide/Wrapper.js
import React, { Component } from 'react';
const { Provider } = require('react-redux');
const configureStore = require('../utils/configureStore').default;
const initialState = {
  app: {
    name: 'Pizza Delivery'
  }
};
const store = configureStore({ initialState });
export default class Wrapper extends Component {
  render() {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    );
  }
}
```

## How to write examples for Relay components?

@mikberg wrote a [fantastic blog post](https://medium.com/@mikaelberg/writing-simple-unit-tests-with-relay-707f19e90129) on this topic. Here's what to do:

### 1. Mock out Relay

You'll need the content from [this Gist](https://gist.github.com/mikberg/07b4006e22aacf31ffe6) for your mocked-out Relay replacement.

```js
// styleguide.config.js
const path = require('path')
const webpackConfig = require('./webpack.config')
webpackConfig.resolve.alias['react-relay'] = 'lib/styleguide/FakeRelay'
webpackConfig.resolve.alias['real-react-relay'] = path.join(__dirname, '/node_modules/react-relay/')

module.exports = {
  // ...
  webpackConfig
}


// lib/styleguide/FakeRelay.js
import Relay from 'real-react-relay'
// Content too long to paste here; see https://gist.github.com/mikberg/07b4006e22aacf31ffe6
```

### 2. Provide sample data to your React components

You'll probably want to massage actual results from your GraphQL backend, and make it available to the examples:

```js
// styleguide.config.js
module.exports = {
  // ...
  context: {
    sample: 'lib/styleguide/sample_data'
  }
}


// lib/styleguide/sample_data.js
module.exports = {
  object: {
    // something similar to your GraphQL results
  }
}


// src/MyComponent/index.md
<MyComponent object={sample.object} />
```

## How to use React Styleguidist with Preact?

You need to alias `react` and `react-dom` to `preact-compat`:

```javascript
module.exports = {
  webpackConfig: {
    resolve: {
      alias: {
        react: 'preact-compat',
        'react-dom': 'preact-compat',
      }
    }
  }
};
```

See the [Preact example style guide](https://github.com/styleguidist/react-styleguidist/tree/master/examples/preact).

## How to use React Styleguidist with styled-components?

The [recommended way](https://github.com/styleguidist/react-styleguidist/issues/37#issuecomment-263502454) of using [styled-components](https://styled-components.com/) is like this:

```javascript
import React, { Component } from 'react';
import styled from 'styled-components';

const SalmonButton = styled.button`
  background-color: salmon;
  border: 1px solid indianred;
  color: snow;
`;

class Button extends Component {
  render() {
    return <SalmonButton>{this.props.children}</SalmonButton>;
  }
}

export default Button;
```

You may need an appropriate webpack loader to handle these files.

> **Note:** To change style guide styles use `theme` and `styles` options (see the next question).

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

> **Note:** See available [theme variables](../src/styles/theme.js).

> **Note:** Styles use [JSS](https://github.com/cssinjs/jss/blob/master/docs/json-api.md) with these plugins: [jss-isolate](https://github.com/cssinjs/jss-isolate), [jss-nested](https://github.com/cssinjs/jss-nested), [jss-camel-case](https://github.com/cssinjs/jss-camel-case), [jss-default-unit](https://github.com/cssinjs/jss-default-unit), [jss-compose](https://github.com/cssinjs/jss-compose).

> **Note:** Use [React Developer Tools](https://github.com/facebook/react-devtools) to find component and style names. For example a component `<LogoRenderer><h1 className="logo-524678444">…` corresponds to an example above.

## How to change the layout of a style guide?

You can replace any Styleguidist React component. But in most of the cases you will want to replace `*Renderer` components — all HTML is rendered by these components. For example `ReactComponentRenderer`, `ComponentsListRenderer`, `PropsRenderer`, etc. — [check the source](https://github.com/styleguidist/react-styleguidist/tree/master/src/rsg-components) to see what components are available.

There’s also a special wrapper component — `Wrapper` — that wraps every example component. By default it just renders `children` as is but you can use it to provide a custom logic.

For example you can replace the `Wrapper` component to wrap any example in the [React Intl’s](https://github.com/yahoo/react-intl) provider component. You can’t wrap the whole style guide because every example is compiled separately in a browser.

```javascript
// styleguide.config.js
const path = require('path');
module.exports = {
  webpackConfig: {
    resolve: {
      alias: {
        'rsg-components/Wrapper': path.join(__dirname, 'lib/styleguide/Wrapper')
      }
    }
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

You can replace the `StyleGuideRenderer` component like this:

```javascript
// styleguide.config.js
const path = require('path');
module.exports = {
  webpackConfig: {
    resolve: {
      alias: {
        'rsg-components/StyleGuide/StyleGuideRenderer': path.join(__dirname, 'lib/styleguide/StyleGuideRenderer')
      }
    }
  }
};

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

![](http://wow.sapegin.me/image/002N2q01470J/debugging.png)

## How to debug the exceptions thrown from my components?

1. Put `debugger;` statement at the beginning of your code.
2. Press the ![Debugger](http://wow.sapegin.me/image/2n2z0b0l320m/debugger.png) button in your browser’s developer tools.
3. Press the ![Continue](http://wow.sapegin.me/image/2d2z1Y2o1z1m/continue.png) button and the debugger will stop execution at the next exception.

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

```javascript
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
