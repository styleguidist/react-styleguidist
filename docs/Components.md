<!-- Locating components #components -->

# Locating your components and organizing your style guide

## Finding components

By default Styleguidist will search components using this [glob pattern](https://github.com/isaacs/node-glob#glob-primer): `src/components/**/*.{js,jsx,ts,tsx}`.

It will pick up files like:

- `src/components/Button.js`,
- `src/components/Button/Button.js`,
- `src/components/Button/index.js`.

But will ignore tests:

- `__tests__` folder,
- files containing `.test.js` or `.spec.js` (or same for `.jsx`, `.ts` and `.tsx`).

If it doesn’t work for you, create a `styleguide.config.js` file in your project’s root folder and configure the patterns to fit your project structure.

For example, if your component files look like `components/Button/Button.js`, but you reexport them in `components/Button/index.js` (like `export { default } from './Button'`) to simplify imports (`components/Button` instead of `components/Button/Button`), you need to skip `index.js`:

```javascript
module.exports = {
  components: 'src/components/**/[A-Z]*.js'
}
```

> **Info:** All paths are relative to the config folder.

> **Tip:** Use [ignore](Configuration.md#ignore) option to exclude some files from the style guide.

> **Tip:** Use [getComponentPathLine](Configuration.md#getcomponentpathline) option to change the path you see below a component name.

## Loading and exposing components

Styleguidist _loads_ your components and _exposes_ them globally for your examples to consume.

### Identifier

It will try to use the `displayName` of your component as the identifier. If it cannot understand a `displayName` (for example if it is dynamically generated), it will fall back to something it can understand.

In each of the following cases, the global identifier will be `Component`.

| Path | Code | Styleguidist understands |
| --- | --- | --- |
| /whatever.js | `export default function Component() { ... }` | displayName |
| /whatever.js | `export default function SomeName() { ... }`<br>`SomeName.displayName = 'Component';` | displayName |
| /whatever.js | `export default function Component() { ... }`<br>`Component.displayName = dynamicNamer();` | displayName at declaration |
| /component.js | `const name = 'SomeName';`<br>`const componentMap = {`<br>`[name]: function() { ... }`<br>`};`<br>`export default componentMap[name];` | Filename |
| /component/index.js | `const name = 'SomeName';`<br>`const componentMap = {`<br>`[name]: function() { ... }`<br>`};`<br>`export default componentMap[name];` | Folder name |

### Default vs named exports

Stylegudist will use an ECMAScript module’s `default` export or CommonJS `module.exports` if they are defined.

```javascript
// /component.js
export default function Component() { ... }
// will be exposed globally as Component

// /component.js
function Component() { ... }
module.exports = Component;
// will be exposed globally as Component
```

If you use only named exports, Styleguidist will expose named exports from modules as follows...

If there is only one named export, it will expose that.

```javascript
// /component.js
export function Component() { ... }
// will be exposed globally as Component
```

If there are several named exports, it will expose the named export which has the same name as the understood identifier.

```javascript
// /component.js
export function someUtil() { ... }
// will not be exposed

export function Component() { ... }
// will be exposed globally as Component
```

> **Caution:** If you export several React components as named exports from a single module, Styleguidist is likely to behave unreliably. If it cannot understand which named export to expose, you may not be able to access that export.

## Sections

Group components into sections or add extra Markdown documents to your style guide.

Each section consists of (all fields are optional):

- `name` — section title.
- `content` — location of a Markdown file containing the overview content.
- `components` — a glob pattern string, an array of component paths or glob pattern strings, or a function returning a list of components or glob pattern strings. The same rules apply as for the root `components` option.
- `sections` — array of subsections (can be nested).
- `description` — A small description of this section.
- `sectionDepth` — Number of subsections with single pages, only available with [pagePerSection](Configuration.md#pagepersection) is enabled.
- `exampleMode` — Initial state of the code example tab, uses [exampleMode](Configuration.md#examplemode).
- `usageMode` — Initial state of the props and methods tab, uses [usageMode](Configuration.md#usagemode).
- `ignore` — string/array of globs that should not be included in the section.
- `href` - an URL to navigate to instead of navigating to the section content
- `external` - if set, the link will open in a new window
- `expand` - Determines if the section should be expanded by default even when `tocMode` is set to `collapse` in general settings

Configuring a style guide with textual documentation section and a list of components would look like:

```javascript
// styleguide.config.js

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
        },
        {
          name: 'Live Demo',
          external: true,
          href: 'http://example.com'
        }
      ]
    },
    {
      name: 'UI Components',
      content: 'docs/ui.md',
      components: 'lib/components/ui/*.js',
      exampleMode: 'expand', // 'hide' | 'collapse' | 'expand'
      usageMode: 'expand' // 'hide' | 'collapse' | 'expand'
    }
  ]
}
```

## Limitations

In some cases Styleguidist may not understand your components, [see possible solutions](Thirdparties.md).
