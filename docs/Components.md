# Locating your components and organizing your style guide

## Components

By default Styleguidist will search components using this [glob pattern](https://github.com/isaacs/node-glob#glob-primer): `src/components/**/*.js`. If it doesn’t work for you, create a `styleguide.config.js` file in your project’s root folder.

If your components look like `components/Button.js` or `components/Button/Button.js` or `components/Button/index.js` (it’s the default behavior, change only if your components are not in `src/components` or files are not `.js`):

```javascript
module.exports = {
  components: 'src/components/**/*.js'
};
```

If your components look like `components/Button/Button.js` + `components/Button/index.js` (you need to skip `index.js`, otherwise component will be loaded twice):

```javascript
module.exports = {
  components: 'src/components/**/[A-Z]*.js'
};
```

Or you need to skip test specs (`components/Button/Button.test.js`):

```javascript
module.exports = {
  components: 'components/**/!(*.test).js'
};
```

> **Note:** All paths are relative to config folder.

## Sections

Group components into sections or add extra Markdown documents to your style guide.

Each section consists of (all fields are optional):

- `name` — section title.
- `content` — location of a Markdown file containing the overview content.
- `components` — a string or function returning a list of components. The same rules apply as for the root `components` option.
- `sections` — array of subsections.

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
          content: 'docs/installation.md'
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
};
```
