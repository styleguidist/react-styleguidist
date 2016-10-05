# Roadmap

## 4.0.0

* [x] Test that bundles are really working with PhantomJS.
* [x] Do not read style guide config from loaders, get if from Webpack config.
* [x] Node API.
* [x] Refactoring: Mocha → AVA.
* [x] Refactoring: Markdown It → Remark on backend and front-end.
* [x] Refactoring: consistent usage of `*Renderer` components.
* [x] Refactoring: consistent usage of config via `context` in React components.
* [ ] Refactoring: move all URLs (docs, homepage, etc.) in code to a single file.

## 4.1.0

* [ ] Improve single-component usage: new props: disable sidebar, getComponentName(), fork me ribbon, hide isolated link, hide pathLine.
* [ ] Improve default props: show whitespace, do not show function source.

## 4.2.0

* [ ]  Code splitting: do not load CodeMirror and Babel (?) until first code editor opened.
