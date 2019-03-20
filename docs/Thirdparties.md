# Working with third-party libraries

<!-- To update run: npx markdown-toc --maxdepth 3 -i docs/Thirdparties.md -->

<!-- toc -->

- [How Styleguidist works](#how-styleguidist-works)
- [Using Styleguidist with other libraries](#using-styleguidist-with-other-libraries)
  - [Redux](#redux)
  - [Relay](#relay)
  - [Styled-components](#styled-components)
  - [Emotion](#emotion)
  - [Fela](#fela)
  - [CSS Modules with react-css-modules](#css-modules-with-react-css-modules)
  - [Styletron](#styletron)

<!-- tocstop -->

## How Styleguidist works

Styleguidist _loads_ your components (see [Loading and exposing components](Components.md#loading-and-exposing-components) for more) but it uses [react-docgen](https://github.com/reactjs/react-docgen) to _generate documentation_ which may require changes in your code to work properly.

React-docgen reads your components as static text files and looks for patterns like class or function declarations that looks like React components. It does not run any JavaScript code, so, if your component is dynamically generated, is wrapped in a higher-order component, or is split into several files, then react-docgen may not understand it.

It supports components defined via `React.createClass`, ES6 classes and stateless functional components, with optional Flow and TypeScript (via [react-docgen-typescript](https://github.com/styleguidist/react-docgen-typescript)) type annotations.

In many cases you may trick Styleguidist and react-docgen by exporting both components: an enhanced component as the default export and a base component as a named export:

```javascript
import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './Button.css'

// Base component will be used by react-docgen to generate documentation
export function Button({ color, size, children }) {
  /* ... */
}

// Enhanced component will be used when you write <Button /> in your example files
export default CSSModules(Button, styles)
```

Each example is rendered in an independent React root. You can control React context by defining a custom Wrapper component like this:

```javascript
// styleguide.config.js
const path = require('path')
module.exports = {
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'src/styleguide/Wrapper')
  }
}
```

Please see our [examples](https://github.com/styleguidist/react-styleguidist/tree/master/examples) and refer to [react-docgen](https://github.com/reactjs/react-docgen) documentation for more information about what types of syntax are supported.

## Using Styleguidist with other libraries

### Redux

To use Redux store with one component, import it from your Markdown example:

````jsx
// ```jsx inside Markdown
import { Provider } from 'react-redux'
import configureStore from '../utils/configureStore'
const initialState = {
  app: {
    name: 'Pizza Delivery'
  }
}
const store = configureStore({ initialState })
;<Provider store={store}>
  <App greeting="Choose your pizza!" />
</Provider>
````

To use Redux store in every component, redefine the `Wrapper` component:

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
import { Provider } from 'react-redux'
import configureStore from '../utils/configureStore'
const initialState = {
  app: {
    name: 'Pizza Delivery'
  }
}
const store = configureStore({ initialState })
export default class Wrapper extends Component {
  render() {
    return <Provider store={store}>{this.props.children}</Provider>
  }
}
```

### Relay

**First, mock out Relay.** You’ll need the content from [this Gist](https://gist.github.com/mikberg/07b4006e22aacf31ffe6) for your mocked-out Relay replacement.

```js
// styleguide.config.js
const path = require('path')
const merge = require('webpack-merge')
module.exports = {
  webpackConfig: merge(require('./webpack.config'), {
    resolve: {
      alias: {
        'react-relay': path.join(
          __dirname,
          'src/styleguide/FakeRelay'
        ),
        'real-react-relay': require.resolve('react-relay')
      }
    }
  })
}
```

```js
// src/styleguide/FakeRelay.js
import Relay from 'real-react-relay'
// Copy contents from https://gist.github.com/mikberg/07b4006e22aacf31ffe6
```

**Second, provide sample data to your React components** to send actual results from your GraphQL backend:

```js
// styleguide.config.js
module.exports = {
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

````jsx
// ```jsx inside Markdown
<MyComponent object={sample.object} />
````

_Based on @mikberg’s [blog post](https://medium.com/@mikaelberg/writing-simple-unit-tests-with-relay-707f19e90129)._

### Styled-components

The recommended way of using [styled-components](https://www.styled-components.com/) is by using a special `@component` JSDoc annotation:

```jsx
import React from 'react'
import styled from 'styled-components'

const SalmonButton = styled.button`
  background-color: salmon;
  border: 1px solid indianred;
  color: snow;
`

/** @component */
export default SalmonButton
```

**Warning:** object notation isn’t supported yet, use string literals instead:

```diff
- const Button = styled.button({
-  color: 'tomato'
- })
+ const Button = styled.button`
+  color: tomato;
+ `
```

#### Adding styled-components `ThemeProvider`

If your styled-components require a theme to render properly, add a `ThemeProvider` to your style guide.

First, create your `Wrapper` component. For this example we’ll put it in the `styleguide/` directory, but you can add it anywhere you want.

```jsx
// styleguide/ThemeWrapper.js
import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components'
import theme from 'where/your/theme/lives'

export default class ThemeWrapper extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        {this.props.children}
      </ThemeProvider>
    )
  }
}
```

Next, add `ThemeWrapper` to your `styleguide.config.js`.

```javascript
// styleguide.config.js
const path = require('path')
module.exports = {
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'styleguide/ThemeWrapper')
  }
}
```

This will automatically apply your theme to your styled-components. When you fire up the style guide, `npx styleguidist server`, you should see your components render as expected.

### Emotion

The usage is similar to [styled-components](#styled-components).

### Fela

Check out the [official example](https://github.com/rofrischmann/fela/tree/master/examples/example-with-styleguidist).

### CSS Modules with react-css-modules

You need to export two components: (1) unstyled React component as named export and (2) enhanced component as a default export:

```javascript
import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './Button.css'

export function Button({ color, size, children }) {
  /* ... */
}

export default CSSModules(Button, styles)
```

This approach will also work with [react-css-themr](https://github.com/javivelasco/react-css-themr) and other similar libraries.

### Styletron

To use Styletron store with one component, require it from your example:

````jsx
// ```jsx inside Markdown
import Styletron from 'styletron-client'
import { StyletronProvider } from 'styletron-react'
;<StyletronProvider styletron={new Styletron()}>
  <App greeting="Choose your pizza!" />
</StyletronProvider>
````

To use Styletron in every component redefine the Wrapper component:

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
import Styletron from 'styletron-client'
import { StyletronProvider } from 'styletron-react'
export default class Wrapper extends Component {
  render() {
    return (
      <StyletronProvider styletron={new Styletron()}>
        {this.props.children}
      </StyletronProvider>
    )
  }
}
```
