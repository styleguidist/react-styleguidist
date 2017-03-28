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

For simple cases like ignoring test specs (like `Button.test.js`) glob negation may be enough:

```javascript
module.exports = {
  components: 'components/**/!(*.test).js'
};
```

Of filter them out by passing a function to `components` option:

```javascript
const path = require('path');
const glob = require('glob');
module.exports = {
  components() {
    // Ignore foo.js and bar.js
    return glob.sync(path.resolve(__dirname, 'lib/components/**/*.js')).filter(module => !/\/(foo|bar).js$/.test(module));
  }
};
```

## How to hide some components in style guide but make them available in examples?

Enable [skipComponentsWithoutExample](Configuration.md) option and do not add example file (`Readme.md` by default) to components you want to ignore.

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

> **Note:** to change style guide styles use `theme` and `styles` options (see the next question).

## How to change styles of a style guide?

Use config option [theme](Configuration.md#theme) to change fonts, colors, etc. and option [styles](Configuration.md#configuration) to tweak style of particular Styleguidist’s components:

```javascript
module.exports = {
  theme: {
    link: 'firebrick',
    linkHover: 'salmon',
    font: '"Comic Sans MS", "Comic Sans", cursive'
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
const StyleGuideRenderer = ({ title, homepageUrl, components, toc, sidebar }) => (
  <div className="root">
    <h1>{title}</h1>
    <main className="wrapper">
      <div className="content">
        {components}
        <footer className="footer">
          <Markdown text={`Generated with [React Styleguidist](${homepageUrl})`} />
        </footer>
      </div>
      {sidebar &&
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
