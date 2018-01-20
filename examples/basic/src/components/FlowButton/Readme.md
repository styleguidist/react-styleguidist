Basic button:

```jsx
<FlowButton>Push Me</FlowButton>
```

Big pink button:

```jsx
<FlowButton size="large" color="deeppink">
  Lick Me
</FlowButton>
```

And you _can_ **use** `any` [Markdown](http://daringfireball.net/projects/markdown/) here.

Fenced code blocks with `js`, `jsx` or `javascript` languages are rendered as a interactive playgrounds:

```jsx
<FlowButton>Push Me</FlowButton>
```

You can add a custom props to an example wrapper (` ```js { "props": { "className": "checks" } } `):

```js { "props": { "className": "checks" } }
<FlowButton>I’m transparent!</FlowButton>
```

Or disable an editor by passing a `noeditor` modifier (` ```js noeditor `):

```jsx noeditor
<FlowButton>Push Me</FlowButton>
```

To render an example as highlighted source code add a `static` modifier: (` ```js static `):

```js static
import React from 'react';
```

Fenced blocks with other languages are rendered as highlighted code:

```html
<h1>Hello world</h1>
```

Each example has its own state that you can access at the `state` variable and change with the `setState` function. Default state is `{}`:

```jsx
<div>
  <FlowButton
    size="small"
    onClick={() => setState({ isOpen: true })}
    disabled={state.isOpen}
  >
    Show Me
  </FlowButton>
  {state.isOpen && (
    <FlowButton
      size="small"
      onClick={() => setState({ isOpen: false })}
    >
      Hide Me
    </FlowButton>
  )}
</div>
```

You can change the default state:

```jsx
initialState = { count: 42 }
;<FlowButton onClick={() => setState({ count: state.count + 1 })}>
  {state.count}
</FlowButton>
```
