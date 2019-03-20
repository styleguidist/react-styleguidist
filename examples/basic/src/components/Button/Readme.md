Basic button:

```jsx
<Button>Push Me</Button>
```

Big pink button:

```jsx
<Button size="large" color="deeppink">
  Click Me
</Button>
```

And you _can_ **use** `any` [Markdown](http://daringfireball.net/projects/markdown/) here.

Fenced code blocks with `js`, `jsx` or `javascript` languages are rendered as a interactive playgrounds:

```jsx
<Button>Push Me</Button>
```

You can add a custom props to an example wrapper (` ```js { "props": { "className": "checks" } } `):

```js { "props": { "className": "checks" } }
<Button>I’m transparent!</Button>
```

Or disable an editor by passing a `noeditor` modifier (` ```js noeditor `):

```jsx noeditor
<Button>Push Me</Button>
```

To render an example as highlighted source code add a `static` modifier: (` ```js static `):

```js static
import React from 'react'
```

Fenced blocks with other languages are rendered as highlighted code:

```html
<h1>Hello world</h1>
```

Current component (like `Button` in this example) is always accessible by its name in the example code. If you want to use other components, you need to explicitly import them:

```jsx
import Placeholder from '../Placeholder'
;<Button>
  <Placeholder />
</Button>
```

Or you can explicitly import everything, to make examples easier to copy into your app code:

```jsx
import React from 'react'
import Button from 'rsg-example/components/Button'
import Placeholder from 'rsg-example/components/Placeholder'
;<Button>
  <Placeholder />
</Button>
```

_Note: `rsg-example` module is an alias defined by the [moduleAliases](https://react-styleguidist.js.org/docs/configuration.html#modulealiases) config option._

Each example has its own state that you can access at the `state` variable and change with the `setState` function. Default state is `{}`:

```jsx
<div>
  <Button
    size="small"
    onClick={() => setState({ isOpen: true })}
    disabled={state.isOpen}
  >
    Show Me
  </Button>
  {state.isOpen && (
    <Button size="small" onClick={() => setState({ isOpen: false })}>
      Hide Me
    </Button>
  )}
</div>
```

You can change the default state:

```jsx
initialState = { count: 42 }
;<Button onClick={() => setState({ count: state.count + 1 })}>
  {state.count}
</Button>
```
