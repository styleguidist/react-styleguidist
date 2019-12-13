import path from 'path';
import startCase from 'lodash/startCase';

function transformFileNameToDisplayName(displayName: string): string {
	// ex: your-buttonTS -> Your Button TS -> YourButtonTS
	// ex: your_button--TS -> Your Button TS -> YourButtonTS
	return startCase(displayName).replace(/\s/g, '');
}

export default function getNameFromFilePath(filePath: string): string {
	let fileName = path.basename(filePath, path.extname(filePath));
	if (fileName === 'index') {
		fileName = path.basename(path.dirname(filePath));
	}

	return transformFileNameToDisplayName(fileName);
}
