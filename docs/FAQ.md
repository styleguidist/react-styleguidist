# FAQ

## How to use `ref`s in examples?

Use `ref` prop as a function and assign a reference to a local variable:

```javascript
initialState = { value: '' };
let textarea;
<div>
  <Button onClick={() => textarea.insertAtCursor('Pizza')}>Insert</Button>
  <Textarea value={state.value} onChange={e => setState({ value: e.target.value })} ref={ref => textarea = ref} />
</div>
```

## How to exclude some components from style guide?

Filter them out in the `components` option:

```javascript
components() {
  return glob.sync(path.resolve(__dirname, 'lib/components/**/*.js')).filter(module => !/\/(foo|bar).js$/.test(module));  // Ignore foo.js and bar.js
},
```

## How to hide some components in style guide but make them available in examples?

Enable [skipComponentsWithoutExample](Configuration.md) option and do not add example file (`Readme.md` by default) to components you want to ignore.

Require these components in your examples:

```javascript
const Button = require('../common/Button');
<Button>Push Me Tender</Button>
```

## How to add babel-polyfill?

Add a new Webpack entry point. In your style guide config:

```javascript
const path = require('path');
module.exports = {
  updateWebpackConfig(webpackConfig) {
    // Babel loader, etc.
    webpackConfig.entry.unshift('babel-polyfill');
    return webpackConfig;
  },
};
```

## How to use React Styleguidist with styled-components?

The [recommened way](https://github.com/styleguidist/react-styleguidist/issues/37#issuecomment-263502454) of using [styled-components](https://styled-components.com/) is like this:

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

## How to add custom JS and CSS?

Add a new Webpack entry point. In your style guide config:

```javascript
const path = require('path');
module.exports = {
  // ...
  updateWebpackConfig(webpackConfig) {
    webpackConfig.entry.push(path.join(__dirname, 'path/to/script.js'));
    webpackConfig.entry.push(path.join(__dirname, 'path/to/styles.css'));
    return webpackConfig;
  },
};
```

You may need an appropriate Webpack loader to handle these files.

## How to change styles of a style guide?

Add a new Webpack entry point in your style guide config:

```javascript
const path = require('path');
module.exports = {
  // ...
  updateWebpackConfig(webpackConfig) {
    webpackConfig.entry.push(path.join(__dirname, 'lib/styleguide/styles.css'));
    return webpackConfig;
  },
};
```

Now you can change almost any piece of a style guide. For example you can change a font and a background color:

```css
.ReactStyleguidist-common__font {
  font-family: "Comic Sans MS", "Comic Sans", cursive;
}
.ReactStyleguidist-colors__base-bg {
  background: hotpink;
}
```

Use your browser’s developer tools to find CSS class names of the elements you want to change.

## How to change the layout of a style guide?

You can replace any Styleguidist React component. But in most of the cases you will want to replace `*Renderer` components — all HTML is rendered by these components. For example `ReactComponentRenderer`, `ComponentsListRenderer`, `PropsRenderer`, etc. — [check the source](https://github.com/styleguidist/react-styleguidist/tree/master/src/rsg-components) to see what components are available.

There‘s also a special wrapper component — `Wrapper` — that wraps every example component. By default it just renders `children` as is but you can use it to provide a custom logic.

For example you can replace the `Wrapper` component to wrap any example in the [React Intl’s](http://formatjs.io/react/) provider component. You can’t wrap the whole style guide because every example is compiled separately in a browser.

```javascript
// styleguide.config.js
const path = require('path');
module.exports = {
  // ...
  updateWebpackConfig(webpackConfig) {
    webpackConfig.resolve.alias['rsg-components/Wrapper'] = path.join(__dirname, 'lib/styleguide/Wrapper');
    return webpackConfig;
  },
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
  // ...
  updateWebpackConfig(webpackConfig) {
    webpackConfig.resolve.alias['rsg-components/StyleGuide/StyleGuideRenderer'] = path.join(__dirname, 'lib/styleguide/StyleGuideRenderer');
    return webpackConfig;
  },
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

## How to add webservices available to my components?
You can add new endpoints to the express server running `react-styleguidist`.
Add a new Webpack entry point in your style guide config:

```javascript
 module.exports = {
    // ...
    configureServer(app) {
    	app.get('/custom-endpoint', (req, res) => {
			res.status(200).send({ response: 'Server invoked' });
		});
    },
  };
```

Your components will be able to invoke the url `http://localhost:3000/custom-endpoint` from their examples.

## How to debug my components and examples?

1. Open your browser’s developer tools
2. Write `debugger;` statement wherever you want: in a component source, a Markdown example or even in an editor in a browser.

![](http://wow.sapegin.me/image/002N2q01470J/debugging.png)

## How to debug the exceptions thrown from my components?

1. Put `debugger;` statement at the beginning of your code.
2. Press the ![Debugger](http://wow.sapegin.me/image/2n2z0b0l320m/debugger.png) button in your browser’s developer tools.
3. Press the ![Continue](http://wow.sapegin.me/image/2d2z1Y2o1z1m/continue.png) button and the debugger will stop execution at the next exception.

## How to change style guide dev server logs output?

You can modify webpack dev server logs format passing `webpack.stats` options inside `updateWebpackConfig`.
```javascript
module.exports = {
  // ...
  updateWebpackConfig(webpackConfig, env) {
    if (env === 'development') {
      webpackConfig.stats.chunks = false;
      webpackConfig.stats.chunkModules = false;
      webpackConfig.stats.chunkOrigins = false;
    }
    return webpackConfig;
  }
};
```

## Why does the style guide list one of my prop types as `unknown`?

This occurs when you are assigning props via `getDefaultProps` that are not listed within the components `propTypes`.

For example, the color prop here is assigned via `getDefaultProps` but missing from the `propTypes`, therefore the style guide is unable to display the correct prop type.

```javascript
Button.propTypes = {
  children: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'normal', 'large']),
};

Button.defaultProps = {
  color: '#333',
  size: 'normal',
};
```

## How do I list public methods of my components?

Tag your method with [`@public`](http://usejsdoc.org/tags-public.html) tag and it will be displayed in the guide.
Use [`@param`](http://usejsdoc.org/tags-param.html) tag to document the method parameters and [`@returns`](http://usejsdoc.org/tags-returns.html) tag to document the return value.

## Are there any other projects like this?

* [Atellier](https://github.com/scup/atellier), a React components emulator.
* [Carte Blanche](https://github.com/carteb/carte-blanche), an isolated development space with integrated fuzz testing for your components.
* [Cosmos](https://github.com/skidding/cosmos), a tool for designing truly encapsulated React components.
* [React BlueKit](http://bluekit.blueberry.io/), render React components with editable source and live preview.
* [React Cards](https://github.com/steos/reactcards), devcards for React.
* [React Storybook](https://github.com/kadirahq/react-storybook), isolate your React UI Component development from the main app.
* [React Styleguide Generator](https://github.com/pocotan001/react-styleguide-generator), a React style guide generator.
* [React-demo](https://github.com/rpominov/react-demo), a component for creating demos of other components with props editor.
* [SourceJS](https://github.com/sourcejs/Source), a platform to unify all your frontend documentation. It has a [Styleguidist plugin](https://github.com/sourcejs/sourcejs-react-styleguidist).
