'use strict';

const get = require('lodash/get');
const getUserPackageJson = require('./getUserPackageJson');

/**
 * Check if project uses Create React App.
 *
 * @return {boolean}
 */
module.exports = function isCreateReactApp() {
	const packageJson = getUserPackageJson();
	return !!get(packageJson, 'devDependencies.react-scripts');
};
