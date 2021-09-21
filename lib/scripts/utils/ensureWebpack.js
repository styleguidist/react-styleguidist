"use strict";

var _getWebpackVersion = _interopRequireDefault(require("./getWebpackVersion"));

var _error = _interopRequireDefault(require("./error"));

var consts = _interopRequireWildcard(require("../consts"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Check webpack availability and version at run time instead of using peerDependencies to allow
 * usage of build tools that contains webpack as their own dependency, like Create React App.
 */
const MIN_WEBPACK_VERSION = 4;
const webpackVersion = (0, _getWebpackVersion.default)();

if (!webpackVersion) {
  throw new _error.default('Webpack is required for Styleguidist, please add it to your project:\n\n' + '    npm install --save-dev webpack\n\n' + 'See how to configure webpack for your style guide:\n' + consts.DOCS_WEBPACK);
} else if (webpackVersion < MIN_WEBPACK_VERSION) {
  throw new _error.default(`Webpack ${webpackVersion} is not supported by Styleguidist, the minimum supported version is ${MIN_WEBPACK_VERSION}`);
}