# Installation

*Webpack is a peer dependency but your project doesn’t have to use it. React Styleguidist works with Webpack 1 and Webpack 2.*

### 1. Install Styleguidist

Install Styleguidist and peer dependencies from npm: 

 ```bash
 npm install --save-dev react-styleguidist react react-dom webpack
 ```

### 2. Point Styleguidist to your React components 

> **Note**: If you’re using [create-react-app](https://github.com/facebookincubator/create-react-app), go directly to step 4.

By default Styleguidist will search component using this glob mask: `src/components/**/*.js`. If it doesn’t work for you, create a **`styleguide.config.js`** file in your project’s root folder.

If your components look like `components/Button.js` or `components/Button/Button.js` or `components/Button/index.js` (it’s the default behavior, change only if your components are not in `src/components` or files are not `.js`):

```javascript
module.exports = {
  components: 'src/components/**/*.js',
};
```

If your components look like `components/Button/Button.js` + `components/Button/index.js` (you need to skip `index.js`, otherwise component will be loaded twice):

```javascript
module.exports = {
  components: 'src/components/**/[A-Z]*.js',
};
```

### 3. Configure transpilers and loaders for your project

Styleguidist uses Webpack under the hood to load your project‘s files, and needs to know how to precess each file type.  

#### Reusing your project’s Webpack config

By default Styleguidist will try to find Webpack config (`webpack.config.dev.js` or `webpack.config.js`) anywhere in your project and use it.

If your Webpack config is located somewhere else, add its location to your `styleguide.config.js`:

```javascript
module.exports = {
  webpackConfigFile: 'configs/webpack.js',
};
```

> **Note:**: `entry`, `externals`, `output` and `plugins` options will be ignored.

> **Note:**: it may not work with your project, see below for other options.

#### Custom Webpack config  

Add a `webpackConfig` section to your `styleguide.config.js`:

```javascript
module.exports = {
 webpackConfig: {
   module: {
     loaders: [
       // Babel loader, will use your project’s .babelrc
       {
         test: /\.jsx?$/,
         exclude: /node_modules/,
         loader: 'babel-loader',
       },
       // Other loaders that is needed for your components
       {
         test: /\.css$/,
         loader: 'style-loader!css-loader?modules',
       },
     ],
   },
 },
};
```

> **Note:**: `output` option will be ignored.

> **Note:** you may want to disable Webpack config auto load by specifying `webpackConfigFile: false`.

#### Basic loaders for non-Webpack projects 

If you use transpilers to run your project files (JSX → JS, SCSS → CSS, etc.), you need to set them up for the style guide too.

Styleguidist generates a Webpack config required for the style guide itself but you need to configure [Webpack loaders](https://webpack.github.io/docs/configuration.html#module-loaders) for your project.

 
### 4. Add npm scripts for convenience 

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "styleguide": "styleguidist server",
    "styleguide:build": "styleguidist build"
  }
}
```

### 5. Start your style guide

Run **`npm run styleguide`** to start style guide dev server.

Run **`npm run styleguide:build`** to build static version.

### 6. What‘s next?

Now [document your components](Documenting.md) or [customize your style guide](Configuration.md) further.
