# Getting Started with React Styleguidist

## 1. Install Styleguidist

1. Install Styleguidist and peer dependencies from npm:

   ```bash
   npm install --save-dev react-styleguidist react react-dom webpack
   ```

2. [Point Styleguidist to your React components](Components.md)

3. [Tell Styleguidist how to load your code](Webpack.md)

**Note:** Webpack is a peer dependency but your project doesn’t have to use it. Styleguidist works with webpack 1 and webpack 2.

**If you’re using [create-react-app](https://github.com/facebookincubator/create-react-app) you only need this:**

```bash
npm install --save-dev react-styleguidist webpack@1
```

## 2. Add npm scripts for convenience (optional)

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "styleguide": "styleguidist server",
    "styleguide:build": "styleguidist build"
  }
}
```

## 3. Start your style guide

Run **`npm run styleguide`** to start style a guide dev server.

Run **`npm run styleguide:build`** to build a static version.

## What’s next?

* [Document your components](Documenting.md)
* [Customize webpack configuration](Webpack.md)
* [Customize your style guide](Configuration.md)
* [Read the FAQ](FAQ.md)
