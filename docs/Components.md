# Locating your components

## List of components

By default Styleguidist will search component using this glob mask: `src/components/**/*.js`. If it doesn’t work for you, create a **`styleguide.config.js`** file in your project’s root folder.

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

## Sections

Allows components to be grouped into sections with a title and optional overview content. Sections can also be content only, with no associated components (for example, a textual introduction). A section definition consists of optional fields:

- `name` — the title of the section.
- `content` — location of a Markdown file containing the overview content.
- `components` — a string or function returning a list of components. The same rules apply as for the root `components` option.
- `sections` — array of subsections.

Configuring a style guide with a textual introduction section, then a UI section would look like:

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
