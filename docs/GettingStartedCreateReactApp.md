# Installation with create-react-app

*If you’re not using [create-react-app](https://github.com/facebookincubator/create-react-app), check out [full installation guide](GettingStarted.md).*

## 1. Install Styleguidist

Install Styleguidist and peer dependencies from npm:

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

Run **`npm run styleguide`** to start a style guide dev server.

Run **`npm run styleguide:build`** to build a static version.

## What’s next?

* [Document your components](Documenting.md)
* [Customize your style guide](Configuration.md)
