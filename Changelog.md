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
