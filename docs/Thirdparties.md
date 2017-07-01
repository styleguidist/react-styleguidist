# Working with third-party libraries

## How Styleguidist works

Styleguidist always uses the default export to *load* your components but it uses [react-docgen](https://github.com/reactjs/react-docgen) to *generate documentation* which may require changes in your code to work properly.

React-docgen reads your components as static text files and looks for patterns like class or function declarations that looks like React components. It does not run any JavaScript code, so, if your component is dynamically generated, is wrapped in a higher-order component, or is split into several files, then react-docgen may not understand it.

It supports components defined via `React.createClass`, ES6 classes and stateless functional components, with optional Flow and TypeScript (via [react-docgen-typescript](https://github.com/styleguidist/react-docgen-typescript)) type annotations.

In many cases you may trick Styleguidist and react-docgen by exporting both components: an enhanced component as the default export and a base component as a named export:

```javascript
import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './Button.css';

// Base component will be used by react-docgen to generate documentation
export function Button({ color, size, children }) { /* ... */ }

// Enhanced component will be used when you write <Button /> in your example files
export default CSSModules(Button, styles);
```

Each example is rendered in an independent React root. You can control React context by defining a custom `Wrapper` component like this:

```javascript
// styleguide.config.js
const path = require('path');
module.exports = {
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'src/styleguide/Wrapper')
  }
};
```

Please see our [examples](https://github.com/styleguidist/react-styleguidist/tree/master/examples) and refer to [react-docgen](https://github.com/reactjs/react-docgen) documentation for more information about what types of syntax are supported.

## Using Styleguidist with other libraries

### Redux

To use Redux store with one component, require it from your example:

```jsx
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
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'lib/styleguide/Wrapper')
  }
};
```

```jsx
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

### Relay

**First, mock out Relay.** You’ll need the content from [this Gist](https://gist.github.com/mikberg/07b4006e22aacf31ffe6) for your mocked-out Relay replacement.

```js
// styleguide.config.js
const path = require('path');
const merge = require('webpack-merge');
module.exports = {
  webpackConfig: merge(require('./webpack.config'), {
    resolve: {
      alias: {
        'react-relay': path.join(__dirname, 'src/styleguide/FakeRelay'),
        'real-react-relay': require.resolve('react-relay'),
      },
    },
  })
}
```

```js
// src/styleguide/FakeRelay.js
import Relay from 'real-react-relay';
// Copy contents from https://gist.github.com/mikberg/07b4006e22aacf31ffe6
```

**Second, provide sample data to your React components** to be able to message actual results from your GraphQL backend:

```js
// styleguide.config.js
module.exports = {
  // ...
  context: {
    sample: path.join(__dirname, 'src/styleguide/sample_data')
  }
}
```

```js
// src/styleguide/sample_data.js
module.exports = {
  object: {
    // Something similar to your GraphQL results
  }
}
```

```jsx
// src/MyComponent/index.md
<MyComponent object={sample.object} />
```

*Based on @mikberg’s [blog post](https://medium.com/@mikaelberg/writing-simple-unit-tests-with-relay-707f19e90129).*


### Styled Components

The [recommended way](https://github.com/styleguidist/react-styleguidist/issues/37#issuecomment-263502454) of using [Styled Components](https://styled-components.com/) is like this:

```jsx
import React from 'react';
import styled from 'styled-components';

const SalmonButton = styled.button`
  background-color: salmon;
  border: 1px solid indianred;
  color: snow;
`;

export default function Button({ children, ...props }) {
  return <SalmonButton {...props}>{children}</SalmonButton>;
}
```

### CSS Modules with react-css-modules

You need to export two components: (1) unstyled React component as named export and (2) enhanced component as a default export:

```javascript
import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './Button.css';

export function Button({ color, size, children }) { /* ... */ }

export default CSSModules(Button, styles);
```
