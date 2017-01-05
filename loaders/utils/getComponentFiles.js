'use strict';

const fs = require('fs');
const path = require('path');
const glob = require('glob');

/**
 * Return absolute paths of components that should be rendered in the style guide.
 *
 * @param {string|Function} components Function or glob pattern.
 * @param {object} config
 * @returns {Array}
 */
module.exports = function getComponentFiles(components, config) {
	if (!components) {
		return [];
	}

	let componentFiles;
	if (typeof components === 'function') {
		componentFiles = components();
	}
	else {
		componentFiles = glob.sync(path.resolve(config.configDir, components));
	}

	// Make paths absolute
	componentFiles = componentFiles.map(file => path.resolve(config.configDir, file));

	if (config.skipComponentsWithoutExample) {
		componentFiles = componentFiles.filter(
			filepath => fs.existsSync(config.getExampleFilename(filepath))
		);
	}

	return componentFiles;
};
