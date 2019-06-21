const path = require('path');

module.exports = function getNameFromFilePath(filePath) {
	let displayName = path.basename(filePath, path.extname(filePath));
	if (displayName === 'index') {
		displayName = path.basename(path.dirname(filePath));
	}

	return displayName
		.charAt(0)
		.toUpperCase()
		.concat(displayName.slice(1))
		.replace(/-([a-z])/, (_, match) => match.toUpperCase());
};
