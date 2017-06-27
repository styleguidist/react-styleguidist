Basic button:

    <Button>Push Me</Button>

Big pink button:

    <Button size="large" color="deeppink">Lick Me</Button>

And you *can* **use** `any` [Markdown](http://daringfireball.net/projects/markdown/) here.

If you define a fenced code block with js | jsx | javascript language it will be rendered as a regular Markdown code snippet:

```jsx
<Button>Push Me</Button>
```

If you define a fenced code block with another language it will be rendered as a regular Markdown code snippet:

```html
<h1>Hello world</h1>
```

If you define a fenced code block with passed 'static' modifier it will be rendered as a regular Markdown code snippet:

```jsx static
import React from 'react';
```

You can define a fenced code block with 'noEditor' modifier. It will be rendered without editor

```jsx noEditor
<Button>Push Me</Button>
```