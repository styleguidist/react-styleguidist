# 2.2.1 - 2016-04-22

* **Fixed**: npm2 compatibility (#131, #132 by @mik01aj).
* Add classes for styling `TR` and `TBODY` tags in Markdown (#130).

# 2.2.0 - 2016-04-20

## New features

### Sections

Allows you to group components into sections and add random Markdown files to your style guide:

```javascript
module.exports = {
  // ...
  sections: [
    {name: 'Introduction', content: 'docs/introduction.md'},
    {name: 'UI Components', content: 'docs/ui.md', components: 'lib/components/ui/*.js'}
  ]
}
```

![](http://wow.sapegin.me/3F1u0m1g2w07/Image%202016-04-20%20at%209.15.24%20AM.png)

[See example style guide](https://github.com/sapegin/react-styleguidist/tree/master/examples/basic-sections).

PRs: #108 by @paulj, #119, #120 by @karlbright.

### Experimental isolated mode

Try to open your styleguide like `http://localhost:3000/#!/Button` and only one component will be rendered (#123 by @karlbright).

### Example doclets support

Now you can add additional examples to your components from external files:

```js
/**
 * Component is described here.
 * @example ./extra.examples.md
 */
export default class SomeComponent extends React.Component {
  // ...
}
```

PRs: #109 by @paulj.

### Ability to change react-docgen behavior

New options: resolver, handler, propsParser.

PRs: #106 by @paulj, #118 by @vslinko.

## Other changes and fixes

* Should work fine in React 15.0.
* Filter in the sidebar uses fuzzy search.
* Mark required props insted of optional in a props table (#102 by @CompuIves)
* Fixed: union elements share same key (#111, #112).
* Fixed CSS hook for Li tag (#101).

# 2.1.0 - 2016-03-03

## New features

* You can filter componets by name in the sidebar (#95 by @zammer).

## Other changes and fixes

* Improved default style (#92 by @karlbright).
* Ensure components list is scrollable (#92 by @karlbright).
* Ensure missing proptypes do not throw errors (#91 by @karlbright).

# 2.0.1 - 2016-02-24

* Fix Node 0.12 compatibility.
* `styleguidist build` exits with an error code when build fails.

# 2.0.0 - 2016-02-22

*Here is a list of changes since 1.3.2 (changes since 2.0.0-rc6: fixed npm2 compatibility, removed rootDir, added assetsDir, no params are passed to components function).*

## Breaking changes

### No default Webpack loaders for your project’s code

Now you need to explicitly specify all Webpack loaders for your project’s code in `styleguide.config.js`:

```javascript
module.exports = {
	// ...
	updateWebpackConfig: function(webpackConfig, env) {
		var sourceDir = path.resolve(__dirname, 'src');  // Affect only your project’s files
		webpackConfig.module.loaders.push(
			// Babel (will use your project’s .babelrc)
			{
				test: /\.jsx?$/,
				include: sourceDir,
				loader: 'babel'
			},
			// Sass
			{
				test: /\.scss$/,
				include: sourceDir,
				loader: 'style!css!sass?precision=10'
			}
		);
		return webpackConfig;
	}
};
```

Your project’s `.babelrc` will not affect Styleguidist, only the loaders you define in `styleguide.config.js`.

When you run dev-server `NODE_ENV` is set to `development` so if you use [React Transform](https://github.com/gaearon/react-transform-hmr) hot module replacement it will be enabled for your components. Otherwise you need to [set it up manually](https://github.com/sapegin/react-styleguidist#installation). When you build style guide `NODE_ENV` is set to `production`.

This change should reduce the number of conflicts between your code and Styleguidist’s.

### Babel 6

Babel 6 is required now.

### No `rootDir` config option

`component` option is now relative to config file location.

```javascript
// 1.3.2
module.exports = {
  rootDir: './lib',
  components: './components/**/*.js',
  // ...
};

// 2.0.0
module.exports = {
  components: './lib/components/**/*.js',
  // ...
};
```

### No params are passed to `components` function

Less magic, just use your own [glob](https://github.com/isaacs/node-glob):

```javascript
// 1.3.2
module.exports = {
  // ...
  components: function(config, glob) {
    return glob.sync(config.rootDir + '/components/**/*.js').filter(function(module) {
      return /\/[A-Z]\w*\.js$/.test(module);
    });
  }
};

// 2.0.0
var path = require('path');
var glob = require('glob');
module.exports = {
  // ...
  components: function() {
    return glob.sync(path.resolve(__dirname, 'lib/components/**/*.js')).filter(function(module) {
      return /\/[A-Z]\w*\.js$/.test(module);
    });
  }
};
```

### Code examples without React playground

Render fenced blocks with language flag as regular Markdown code snippets.

If you define a fenced code block with a language flag like this:

	```javascript
	import React from 'react';
	```

it will be rendered as a regular Markdown code snippet:

```javascript
import React from 'react';
```

## New features

* `assetsDir` config option. Serve this directory as static in dev-server, you can access any files at `/`.

## Other changes

* react-docgen updated to 2.7.0 that support flow proptypes (#79 by @codemix).

## Fixes

* Do not escape inline code blocks (#71).
* Fallback to file name or folder name if component name can’t be detected in runtime (#84).
* Styleguidist Babel loader should not read project’s `.babelrc` file.


# 2.0.0-rc6 - 2016-02-18

## Breaking changes

Render fenced blocks with language flag as regular Markdown code snippets.

If you define a fenced code block with a language flag like this:

	```javascript
	import React from 'react';
	```

it will be rendered as a regular Markdown code snippet:

```javascript
import React from 'react';
```

## Fixes

* Do not escape inline code blocks (#71).

# 2.0.0-rc5 - 2016-02-17

Fix error about dog-names module which is used on the example page and shouldn’t be required when you install `react-styleguidist`.

# 2.0.0-rc4 - 2016-02-17

## Breaking changes

Now you need to explicitly specify all Webpack loaders for your project’s code in `styleguide.config.js`:

```javascript
module.exports = {
	// ...
	updateWebpackConfig: function(webpackConfig, env) {
		var sourceDir = path.resolve(__dirname, 'src');
		webpackConfig.module.loaders.push(
			// Babel (will use your project’s .babelrc)
			{
				test: /\.jsx?$/,
				include: sourceDir,
				loader: 'babel'
			},
			// Sass
			{
				test: /\.scss$/,
				include: sourceDir,
				loader: 'style!css!sass?precision=10'
			}
		);
		return webpackConfig;
	}
};
```

Your project’s `.babelrc` will not affect Styleguidist, only the loaders you define in `styleguide.config.js`.

When you run dev-server `NODE_ENV` is set to `development` so if you use [React Transform](https://github.com/gaearon/react-transform-hmr) hot module replacement it will be enabled your components. Otherwise you need to set it up manually. When you build style guide `NODE_ENV` is set to `production`.

## Other changes

* Remove postcss to reduce possible conflicts with project’s code: postcss-loader would share plugins.
* Fallback to file name or folder name if component name can’t be detected in runtime (#84).

# 2.0.0-rc3 - 2016-02-08

* Try to fix problem with unknown `displayName` (#74).

# 2.0.0-rc2 - 2016-02-08

* Move babel-preset-react-hmre and babel-standalone to dependencies.

# 2.0.0-rc - 2016-02-08

## Breaking changes

### Babel 6

Please try it and report any issues or ideas how to improve it.

(#81 by @oliverturner).

### Custom Babel environment

* Set `NODE_ENV` to `development` or `production`.
* Set `BABEL_ENV` to `styleguidist` or `production`. Move hot reload config into `styleguidist` environment to prevent collisions with project’s Babel configuration (#58).

## Other changes

* react-docgen updated to 2.7.0 that support flow proptypes (#79 by @codemix).
* Serve root directory as static in dev-server (so you can access any files inside the root directory).

# 1.3.2 - 2016-01-08

* Remove ExtractTextPlugin.
* Fix typo in CSS.

# 1.3.1 - 2015-12-16

Bug fixes by @lovelybooks:

* Fix npm 2 support (#59, #66).
* Fix layout for wiiide components (#67).

# 1.3.0 - 2015-12-02

## New features

### Per examples state

Each example has its own state that you can access at the `state` variable and change with the `setState` function. Default state is `{}`.

```js
<div>
  <button onClick={() => setState({isOpen: true})}>Open</button>
  <Modal isOpen={state.isOpen}>
    <h1>Hallo!</h1>
    <button onClick={() => setState({isOpen: false})}>Close</button>
  </Modal>
</div>
```

Related issue: #45.

### Ability to style a style guide

Now you can change almost any piece of a style guide. For example you can change a font and a background color:

```css
.ReactStyleguidist-common__font {
  font-family: "Comic Sans MS", "Comic Sans", cursive;
}
.ReactStyleguidist-colors__base-bg {
  background: hotpink;
}
```

More [in the docs](https://github.com/sapegin/react-styleguidist#how-to-change-styles-of-a-style-guide).

Related issue: #32

### Other new features

* Table of contents (#28).
* Ability to use Markdown in components and props descriptions (#32).
* `PropTypes.shape` support (#20).
* Ability to change path line via `getComponentPathLine` option (#41).

## Bug fixes

* Improved styles isolation: Styleguidist styles should not interfer with your components styles.
* Removed sanitize.css that causes a lot of problems with component styles.
* Fixed issue when using components with the same names as component in Styleguidist.

## Other changes

* Use [markdown-it](https://github.com/markdown-it/markdown-it) and [Markdown React](https://github.com/alexkuz/markdown-react-js) instead of Marked.
* A lot of [documentation](https://github.com/sapegin/react-styleguidist/blob/master/Readme.md) improvements and new examples [in the demo style guide](http://sapegin.github.io/react-styleguidist/).

# 1.2.1 - 2015-11-18

* Stateless React components support (#44, #46, by @sunesimonsen).
* Avoid conflicts with host projects when using the same component names as in react-styleguidist (#48, by @sunesimonsen).

# 1.2.0 - 2015-11-16

* New feature: require() support in code examples (#25, by [lovelybooks](https://github.com/lovelybooks)).
* Show file name under component title (#29, by [lovelybooks](https://github.com/lovelybooks)).
* New option: skipComponentsWithoutExample (#38, by [panayi](https://github.com/panayi)).
* PropTypes.arrayOf and PropTypes.instanceOf support (#13, #17, #20).
* A bit better JSX syntax highlighting (#19).
* Add babel-plugin-react-display-name. Should preserve displayName when using React.createComponent (#18).
* Use Babel instead of JSXTransformer to compile examples in the browser (#16).
* Update react-codemirror, fix warnings in React 0.14 (#39).
* Add react-dom as a peer dependency.
* Drop Node 0.10 support.

# 1.1.1 - 2015-10-28

* Fix Wrapper component import to make Webpack’s aliases work with it.

# 1.1.0 - 2015-10-28

* Add a new Wrapper component that wraps every component in the style guide. It allows you to provide necessary context (e.g. react-intl) for every component.
* Nicer errors in the playground.

# 1.0.0 - 2015-10-28

* Require React 0.14, drop React 0.13 support.
* The `StyleGuide` component is just a container now (layout is now in the `Layout` component). It should make injecting your own components easier.
* Better error handling when react-docgen cannot parse component source.

# 0.2.1 - 2015-10-13

* npm 3 support.

# 0.2.0 - 2015-10-08

* New config options: template (#14), highlightTheme (#15) (by [reintroducing](https://github.com/reintroducing)).
* Union type support in PropTypes (#17, by [reintroducing](https://github.com/reintroducing))

# 0.1.8 - 2015-10-04

* Improve rootDir option check.

# 0.1.7 - 2015-10-04

* Fix HTML template path.

# 0.1.6 - 2015-10-04

* Fix babel-plugin-react-transform import, update config format (#9).
* Include babel-plugin-react-transform only in development.
* styleguideDir option should be relative to config file.

# 0.1.5 - 2015-10-03

* Add JSX extension (#10).
* Move Babel configuration to Webpack config (probably fixes #9).

# 0.1.4 - 2015-09-29

* Respect modules required by the host project but prefer modules from the Styleguidist (#5, #6).

# 0.1.3 - 2015-09-29

* Make Webpack import modules from the Styleguidist instead of the host project (#5).

# 0.1.2 - 2015-09-29

* Now peerDependencies should not fail with React 0.14.0-rc1.
* Update dependencies.

# 0.1.1 - 2015-09-27

* Fix the name of bin script.

# 0.1.0 - 2015-09-24

* First usable ersion.

# 0.0.1 - 2015-09-07

* First version.
