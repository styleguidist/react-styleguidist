# Documenting components

Styleguidist generates documentation from three sources:

## PropTypes and component description in the source code

```javascript
import React, { PropTypes } from 'react';

/**
 * General component description.
 */
export default class Button extends React.Component {
  static propTypes = {
    /** Description of prop "foo". */
    foo: PropTypes.number,
    /** Description of prop "baz". */
    baz: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
  };
  static defaultProps = {
    foo: 42,
  };

  render() {
    /* ... */
  }
}
```

> **Note:** [Flow](https://flowtype.org/) type annotations are supported too.

> **Note:** You can change its behavior using [propsParser](Configuration.md#propsparser) and [resolver](Configuration.md#resolver) options.

> **Note:** Component’s `PropTypes` and documentation comments are parsed by the [react-docgen](https://github.com/reactjs/react-docgen) library.

## Usage examples and further documentation in Markdown

Examples are written in Markdown where any code block without a language tag will be rendered as a React component. By default any `Readme.md` or `ComponentName.md` in the component’s folder is treated as an examples file.

    React component example:

        <Button size="large">Push Me</Button>

    One more with generic code fence:

    ```
    <Button size="large">Push Me</Button>
    ```

    One more with `example` code fence (text editors may alias to `jsx` or `javascript`):

    ```example
    <Button size="large">Push Me</Button>
    ```

    This example rendered only as highlighted source code:

    ```html
    <Button size="large">Push Me</Button>
    ```

    Any [Markdown](http://daringfireball.net/projects/markdown/) is **allowed** _here_.

> **Note:** You can change documentation file name with the [getExampleFilename](Configuration.md#getexamplefilename) option.

## External examples using doclet tags

Additional example files can be associated with components using doclet (`@example`) syntax.

The following component will also have an example as loaded from the `extra.examples.md` file:

```javascript
/**
 * Component is described here.
 *
 * @example ./extra.examples.md
 */
export default class Button extends React.Component {
  // ...
}
```

## Documenting component public methods

Mark you public methods with [JSDoc `@public` tag](http://usejsdoc.org/tags-public.html):

```javascript
/**
 * Insert text at cursor position.
 *
 * @param {string} text
 * @public
 */
insertAtCursor(text) {
  // ...
}
```

## Writing code examples

Code examples in Markdown use the ES6+JSX syntax. They can access all the components of your style guide using global variables:

```html
<Panel>
  <p>Using the Button component in the example of the Panel component:</p>
  <Button>Push Me</Button>
</Panel>
```

You can also `require` other modules (e.g. mock data that you use in your unit tests) from examples in Markdown:

```jsx
const mockData = require('./mocks');
<Message content={mockData.hello} />
```

> **Note:** ES6 `import` syntax isn’t supported. You can `require` only from examples in Markdown files.

Each example has its own state that you can access at the `state` variable and change with the `setState` function. Default state is `{}`.

```js
initialState = { isOpen: false };
<div>
  <button onClick={() => setState({ isOpen: true })}>Open</button>
  <Modal isOpen={state.isOpen}>
    <h1>Hallo!</h1>
    <button onClick={() => setState({ isOpen: false })}>Close</button>
  </Modal>
</div>
```

You *can* create `React.Component`s in your code examples:

```jsx
class SortTable extends React.Component {
  constructor() {
    super();
    this.state = { /* ... */ };
  }
  render() {
    const { columns, rows } = this.state;
    const sortedRows = require('sortabular').sorter({ /* ... */ })(rows);
    return (
      <TableProvider columns={columns}>
        <Table.Header />
        <Table.Body rows={sortedRows} rowKey="id" />
      </TableProvider>
    );
  }
}
<SortTable />
```

> **Note:** If you need a more complex demo it’s often a good idea to define it in a separate JavaScript file and `require` it in Markdown
