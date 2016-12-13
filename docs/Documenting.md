# Documenting components

Styleguidist generates documentation from three sources:

### PropTypes and component description in the source code

Components’ `PropTypes` and documentation comments are parsed by the [react-docgen](https://github.com/reactjs/react-docgen) library. Have a look at [their example](https://github.com/reactjs/react-docgen#example) of a component documentation. You can change its behaviour using `propsParser` and `resolver` [options](Configuration.md).

[Flow](https://flowtype.org/) type annotations are supported too.

### Usage examples and further documentation in Markdown

Examples are written in Markdown where any code block without a language tag will be rendered as a React component. By default any `Readme.md` in the component’s folder is treated as an examples file but you can change it with the `getExampleFilename` [option](Configuration.md).

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

### External examples using doclet tags

Additional example files can be associated with components using doclet (`@example`) syntax. The following component will also have an example as loaded from the `extra.examples.md` file:

```javascript
/**
 * Component is described here.
 *
 * @example ./extra.examples.md
 */
export default class SomeComponent extends React.Component {
  // ...
}
```

## Writing code examples

Code examples in Markdown use the ES6+JSX syntax. They can access all the components of your style guide using global variables.

You can also `require` other modules (e.g. mock data that you use in your unit tests) from examples in Markdown:

```javascript
const mockData = require('./mocks');
<Message content={mockData.hello} />
```

Each example has its own state that you can access at the `state` variable and change with the `setState` function. Default state is `{}`.

```html
<div>
  <button onClick={() => setState({isOpen: true})}>Open</button>
  <Modal isOpen={state.isOpen}>
    <h1>Hallo!</h1>
    <button onClick={() => setState({isOpen: false})}>Close</button>
  </Modal>
</div>
```

If you want to set the default state you can do:

```javascript
initialState = { key: 42 };
```

You *can* use `React.createClass` in your code examples, but if you need a more complex demo it’s often a good idea to define it in a separate JavaScript file instead and then just `require` it in Markdown.

## Code examples caveat

Object references will not work as expected in examples state due to how the examples code is evaluated.

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
