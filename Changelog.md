### 2015-10-28 v1.0.0

* Require React 0.14, drop React 0.13 support.
* The `StyleGuide` component is just a container now (layout is now in the `Layout` component). It should make injecting your own components easier.
* Better error handling when react-docgen cannot parse component source.

### 2015-10-13 v0.2.1

* npm 3 support.

### 2015-10-08 v0.2.0

* New config options: template (#14), highlightTheme (#15) (by [reintroducing](https://github.com/reintroducing)).
* Union type support in PropTypes (#17, by [reintroducing](https://github.com/reintroducing))

### 2015-10-04 v0.1.8

* Improve rootDir option check.

### 2015-10-04 v0.1.7

* Fix HTML template path.

### 2015-10-04 v0.1.6

* Fix babel-plugin-react-transform import, update config format (#9).
* Include babel-plugin-react-transform only in development.
* styleguideDir option should be relative to config file.

### 2015-10-03 v0.1.5

* Add JSX extension (#10).
* Move Babel configuration to Webpack config (probably fixes #9).

### 2015-09-29 v0.1.4

* Respect modules required by the host project but prefer modules from the Styleguidist (#5, #6).

### 2015-09-29 v0.1.3

* Make Webpack import modules from the Styleguidist instead of the host project (#5).

### 2015-09-29 v0.1.2

* Now peerDependencies should not fail with React 0.14.0-rc1.
* Update dependencies.

### 2015-09-27 v0.1.1

* Fix the name of bin script.

### 2015-09-24 v0.1.0

* First usable version.

### 2015-09-07 v0.0.1

* First version.
