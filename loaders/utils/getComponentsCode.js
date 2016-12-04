'use strict';

const toCode = require('./toCode');
const processComponent = require('./processComponent');

/**
 * Return JS code as a string for given components.
 *
 * @param {Array} components File names of components.
 * @param {object} config
 * @returns {string|null}
 */
module.exports = function getComponentsCode(components, config) {
	if (!components.length) {
		return null;
	}

	return toCode(components.map(filepath => processComponent(filepath, config)));
};
