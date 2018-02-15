# Locating your components and organizing your style guide

<!-- To update run: npx markdown-toc --maxdepth 2 -i docs/Components.md -->

<!-- toc -->

* [Finding components](#finding-components)
* [Loading and exposing components](#loading-and-exposing-components)
* [Sections](#sections)
* [Limitations](#limitations)

<!-- tocstop -->

## Finding components

By default Styleguidist will search components using this [glob pattern](https://github.com/isaacs/node-glob#glob-primer): `src/components/**/*.{js,jsx,ts,tsx}`.

It will pick up files like:

* `src/components/Button.js`,
* `src/components/Button/Button.js`,
* `src/components/Button/index.js`.

But will ignore tests:

* `__tests__` folder,
* files containing `.test.js` or `.spec.js` (or same for `.jsx`, `.ts` and `.tsx`).

If it doesn’t work for you, create a `styleguide.config.js` file in your project’s root folder and configure the patterns to fit your project structure.

For example, if your component files look like `components/Button/Button.js`, but you reexport them in `components/Button/index.js` (like `export { default } from './Button'`) to simplify imports (`components/Button` instead of `components/Button/Button`), you need to skip `index.js`:

```javascript
module.exports = {
  components: 'src/components/**/[A-Z]*.js'
}
```

> **Note:** All paths are relative to the config folder.

> **Note:** Use [ignore](Configuration.md#ignore) option to exclude some files from the style guide.

> **Note:** Use [getComponentPathLine](Configuration.md#getcomponentpathline) option to change a path you see below a component name.

## Loading and exposing components

Styleguidist _loads_ your components and _exposes_ them globally for your examples to consume.

### Identifier

It will try to use the `displayName` of your component as the identifier.

```javascript
// /path/to/component-one.js
export default function Component() { ... }
// will be exposed globally as Component

// /path/to/component-two.js
export default function Component() { ... }
Component.displayName = 'ComponentTwo'
// will be exposed globally as ComponentTwo
```

If it cannot understand a `displayName` (for example if it is dynamically generated), it will fall back to something it can understand.

```javascript
// /path/to/component-three.js
export default function Component() { ... }
Component.displayName = getDisplayName() // can't understand this
// will fall back to the name at declaration and expose globally as Component

// /path/to/component-four.js
const name = 'Component';
const componentMap = {
  [name]: function() { ... } // can't understand this
}
export default componentMap[name]; // can't understand this either
// will fall back on the file name, convert it to PascalCase
// and expose globally as ComponentFour
```

### default vs named exports

Styleguidist defaults to exposing the `default` export from your component file. It understands functions exported as CommonJs `module.exports` as default exports.

```javascript
// /path/to/component-five.js
export default function ComponentFive() { ... }
// will be exposed globally as ComponentFive

// /path/to/component-six.js
function ComponentSix() { ... }
module.exports = ComponentSix;
// will be exposed globally as ComponentSix
```

If you do not use `default` exports, Styleguidist will expose named exports from modules as follows...

If there is only one named export, it will expose that.

```javascript
// /path/to/component-seven.js
export function ComponentSeven() { ... }
// will be exposed globally as ComponentSeven
```

If there are several named exports, it will expose the named export which has the same name as the understood identifier.

```javascript
// /path/to/component-eight.js
export function someUtil() { ... }
// will not be exposed

export function ComponentEight() { ... }
// will be exposed globally as ComponentEight
```

If you export several React components as named exports from a single module, Styleguidist is likely to behave unreliably. If it cannot understand which named export to expose, it will fall back to exposing the module as a whole.

## Sections

Group components into sections or add extra Markdown documents to your style guide.

Each section consists of (all fields are optional):

* `name` — section title.
* `content` — location of a Markdown file containing the overview content.
* `components` — a glob pattern string or a function returning a list of components. The same rules apply as for the root `components` option.
* `sections` — array of subsections (can be nested).
* `description` — A small description of this section.
* `ignore` — string/array of globs that should not be included in the section.

Configuring a style guide with textual documentation section and a list of components would look like:

```javascript
module.exports = {
  sections: [
    {
      name: 'Introduction',
      content: 'docs/introduction.md'
    },
    {
      name: 'Documentation',
      sections: [
        {
          name: 'Installation',
          content: 'docs/installation.md',
          description: 'The description for the installation section'
        },
        {
          name: 'Configuration',
          content: 'docs/configuration.md'
        }
      ]
    },
    {
      name: 'UI Components',
      content: 'docs/ui.md',
      components: 'lib/components/ui/*.js'
    }
  ]
}
```

## Limitations

In some cases Styleguidist may not understand your components, [see possible solutions](Thirdparties.md).
