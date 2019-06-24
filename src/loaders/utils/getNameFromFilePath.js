const path = require('path');
const { startCase } = require('lodash');

function transformDisplayName(displayName) {
	// ex: your-buttonTS => Your Button TS => YourButtonTS
	// ex: your_button--TS => Your Button TS => YourButtonTS
	return startCase(displayName).replace(/\s/g, '');
}

module.exports = function getNameFromFilePath(filePath) {
	let displayName = path.basename(filePath, path.extname(filePath));
	if (displayName === 'index') {
		displayName = path.basename(path.dirname(filePath));
	}

	return transformDisplayName(displayName);
};
