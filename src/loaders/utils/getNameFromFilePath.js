const path = require('path');
const { startCase } = require('lodash');

function transformFileNameToDisplayName(displayName) {
	// ex: your-buttonTS -> Your Button TS -> YourButtonTS
	// ex: your_button--TS -> Your Button TS -> YourButtonTS
	return startCase(displayName).replace(/\s/g, '');
}

module.exports = function getNameFromFilePath(filePath) {
	let fileName = path.basename(filePath, path.extname(filePath));
	if (fileName === 'index') {
		fileName = path.basename(path.dirname(filePath));
	}

	return transformFileNameToDisplayName(fileName);
};
