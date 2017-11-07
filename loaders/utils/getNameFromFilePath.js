'use strict';
const path = require('path');

module.exports = function getNameFromFilePath(filePath) {
	let displayName = path.basename(filePath, path.extname(filePath));
	if (displayName === 'index') {
		const parts = path.dirname(filePath).split(path.sep);
		displayName = parts[parts.length - 1];
	}

	return displayName
		.charAt(0)
		.toUpperCase()
		.concat(displayName.slice(1))
		.replace(/-([a-z])/, (_, match) => match.toUpperCase());
};
