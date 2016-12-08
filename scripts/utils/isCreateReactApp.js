'use strict';

const get = require('lodash/get');

/**
 * Check if project uses Create React App.
 *
 * @param {object} packageJson
 * @return {boolean}
 */
module.exports = function isCreateReactApp(packageJson) {
	const dependencies = get(packageJson, 'dependencies', {});
	return !!dependencies['react-scripts'];
};
