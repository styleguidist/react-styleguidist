# Getting Started with React Styleguidist

## 1. Install Styleguidist

Install Styleguidist from npm:

```bash
npm install --save-dev react-styleguidist react react-dom webpack node-pre-gyp nan
```
And ignore the resulting npm error:

```bash
npm ERR! peer dep missing: react-docgen@2.x, required by react-docgen-displayname-handler@1.0.0
```

## 2. Configure your style guide

**If you’re using [Create React App](https://github.com/facebookincubator/create-react-app) you can skip this step.**

[Point Styleguidist to your React components](Components.md) and [tell how to load your code](Webpack.md).

## 3. Add npm scripts for convenience

Add these scripts to your `package.json`:

```diff
{
  "scripts": {
+    "styleguide": "styleguidist server",
+    "styleguide:build": "styleguidist build"
  }
}
```

## 4. Start your style guide

Run **`npm run styleguide`** to start style a guide dev server.

Run **`npm run styleguide:build`** to build a static version.

## 5. Start documenting your components

See how to [document your components](Documenting.md)

## Have questions?

* [Read the cookbook](Cookbook.md)
* [Join our Gitter chat](https://gitter.im/styleguidist/styleguidist)
