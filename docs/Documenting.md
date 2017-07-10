# Documenting components

Styleguidist generates documentation for your components based on the comments in your source code, propTypes declarations and Readme files.

> **Note:** [See examples](https://github.com/styleguidist/react-styleguidist/tree/master/examples/basic/src/components) of documented components in our demo style guide.

## Code comments and propTypes

Styleguidist will display your components’ JSDoc comment blocks. Also, it will pick up props from propTypes declarations and display them in a table.

```javascript
import React from 'react';
import PropTypes from 'prop-types';

/**
 * General component description in JSDoc format. Markdown is *supported*.
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

> **Note:** [Flow](https://flowtype.org/) type annotations are supported too. For TypeScript install [react-docgen-typescript](https://github.com/styleguidist/react-docgen-typescript)

> **Note:** You can change its behavior using [propsParser](Configuration.md#propsparser) and [resolver](Configuration.md#resolver) options.

> **Note:** Component’s `PropTypes` and documentation comments are parsed by the [react-docgen](https://github.com/reactjs/react-docgen) library.

## Usage examples and Readme files

Styleguidist will look for any `Readme.md` or `ComponentName.md` files in the component’s folder and display them. Any code block with a language tag of 'js', 'jsx'
 or 'javascript' will be rendered as a React component with live editable preview.

    React component example:

    ```js
    <Button size="large">Push Me</Button>
    ```

    You can disable an editor by passing a 'noeditor' modifier:
    
    ```jsx noeditor
    <Button>Push Me</Button>
    ```
    
    You can disable a playground by passing a 'static' modifier:
    
    ```jsx static
    import React from 'react';
    ```
 
    Examples with all other languages are rendered only as highlighted source code, not an actual component:

    ```html
    <Button size="large">Push Me</Button>
    ```

    Any [Markdown](http://daringfireball.net/projects/markdown/) is **allowed** _here_.

> **Note:** You can configure examples file name with the [getExampleFilename](Configuration.md#getexamplefilename) option.

## External examples using doclet tags

Additional example files can be associated with components using `@example` doclet syntax.

The following component will also have an example loaded from the `extra.examples.md` file:

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

> **Note:** You’ll need a regular example file (like `Readme.md`) too when [skipComponentsWithoutExample](Configuration.md#skipcomponentswithoutexample) is `true`.

## Public methods

By default, any methods your components have are considered to be private and are not published. Mark your public methods with JSDoc [`@public`](http://usejsdoc.org/tags-public.html) tag to get them published in the docs:

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

## Ignoring props

By default, all props your components have are considered to be public and are published. In some rare cases you might want to remove a prop from the documentation while keeping it in the code. To do so, mark the prop with JSDoc [`@ignore`](http://usejsdoc.org/tags-ignore.html) tag to remove it from the docs:

```javascript
MyComponent.propTypes = {
  /**
   * A prop that should not be visible in the documentation.
   *
   * @ignore
   */
  hiddenProp: React.PropTypes.string
}
```

## Using JSDoc tags

You can use the following [JSDoc](http://usejsdoc.org/) tags when documenting components, props and methods:

- [@deprecated](http://usejsdoc.org/tags-deprecated.html)
- [@see, @link](http://usejsdoc.org/tags-see.html)
- [@author](http://usejsdoc.org/tags-author.html)
- [@since](http://usejsdoc.org/tags-since.html)
- [@version](http://usejsdoc.org/tags-version.html)

When documenting props you can also use:

- [@param, @arg, @argument](http://usejsdoc.org/tags-param.html)

All tags can render Markdown.

```javascript
/**
 * The only true button.
 *
 * @version 1.0.1
 * @author [Artem Sapegin](https://github.com/sapegin)
 * @author [Andy Krings-Stern](https://github.com/ankri)
*/
class Button extends React.Component {
  static propTypes = {
    /**
     * Button label.
     */
    children: PropTypes.string.isRequired,
    /**
     * The color for the button
     *
     * @see See [Wikipedia](https://en.wikipedia.org/wiki/Web_colors#HTML_color_names) for a list of color names
     * @see See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) for a list of color names
     */
    color: PropTypes.string,
    /**
     * The size of the Button
     *
     * @since Version 1.0.1
     */
    size: PropTypes.oneOf(['small', 'normal', 'large']),
    /**
     * The width of the button
     *
     * @deprecated Do not use! Use `size` instead!
     */
    width: PropTypes.number,
    /**
     * Gets called when the user clicks on the button
     *
     * @param {SyntheticEvent} event The react `SyntheticEvent`
     * @param {Object} allProps All props of this Button
     */
    onClick: PropTypes.func
  };
}
```

## Writing code examples

Code examples in Markdown use the ES6+JSX syntax. They can access all the components of your style guide using global variables:

```jsx
<Panel>
  <p>Using the Button component in the example of the Panel component:</p>
  <Button>Push Me</Button>
</Panel>
```

> **Note:** Styleguidist uses [Bublé](https://buble.surge.sh/guide/) to run ES6 code on the frontend, it supports [most of the ES6 features](https://buble.surge.sh/guide/#unsupported-features).

You can also `require` other modules (e.g. mock data that you use in your unit tests) from examples in Markdown:

```jsx
const mockData = require('./mocks');
<Message content={mockData.hello} />
```

> **Note:** You can `require` only from examples in Markdown files. ES6 `import` syntax isn’t supported.

Each example has its own state that you can access at the `state` variable and change with the `setState` function. Default state is `{}`.

```jsx
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

## Limitations

In some cases Styleguidist may not understand your components, [see possible solutions](Thirdparties.md).
