/**
 * Check webpack availability and version at run time instead of using peerDependencies to allow
 * usage of build tools that contains webpack as their own dependency, like Create React App.
 */

import getWebpackVersion from './getWebpackVersion';
import StyleguidistError from './error';
import * as consts from '../consts';

const MIN_WEBPACK_VERSION = 4;
const webpackVersion = getWebpackVersion();

if (!webpackVersion) {
	throw new StyleguidistError(
		'Webpack is required for Styleguidist, please add it to your project:\n\n' +
			'    npm install --save-dev webpack\n\n' +
			'See how to configure webpack for your style guide:\n' +
			consts.DOCS_WEBPACK
	);
} else if (webpackVersion < MIN_WEBPACK_VERSION) {
	throw new StyleguidistError(
		`Webpack ${webpackVersion} is not supported by Styleguidist, the minimum supported version is ${MIN_WEBPACK_VERSION}`
	);
}
