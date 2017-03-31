'use strict';

const processComponent = require('./processComponent');

/**
 * Process each component in a list.
 *
 * @param {Array} components File names of components.
 * @param {object} config
 * @returns {object|null}
 */
module.exports = function getComponents(components, config) {
	return components.map(filepath => processComponent(filepath, config));
};
