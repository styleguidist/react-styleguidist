### React Styleguidist styled-components TypeScript

Secondary and primary buttons:

```jsx harmony
<Button>Push me</Button> <Button variant="primary">Push me</Button>
```

Disabled buttons:

```jsx harmony
<Button disabled>Can’t touch this</Button> <Button variant="primary" disabled>Can’t touch this</Button>
```

Full width button:

```js
<Button fullWidth>Click me</Button> <Button variant="primary" fullWidth as="a" href="/">Click me</Button>
```

Button as a link:

```js
<Button as="a" href="/">Click me</Button> <Button as="a" href="/" variant="primary">Click me</Button>
```
