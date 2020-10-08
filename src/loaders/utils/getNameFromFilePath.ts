import path from 'path';
import startCase from 'lodash/startCase';

/**
 * your-buttonTS -> YourButtonTS
 * your_button--TS -> YourButtonTS
 */
function transformFileNameToDisplayName(displayName: string): string {
	return startCase(displayName).replace(/\s/g, '');
}

export default function getNameFromFilePath(filePath: string): string {
	let fileName = path.basename(filePath, path.extname(filePath));
	if (fileName === 'index') {
		fileName = path.basename(path.dirname(filePath));
	}

	return transformFileNameToDisplayName(fileName);
}
