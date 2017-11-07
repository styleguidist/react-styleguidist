'use strict';
const path = require('path');
const _ = require('lodash');

module.exports = function getNameFromFilePath(filePath) {
	let displayName = path.basename(filePath, path.extname(filePath));
	if (displayName === 'index') {
		displayName = path.basename(path.dirname(filePath));
	}

	return _.upperFirst(_.camelCase(displayName));
};
