import fs from 'fs';
import path from 'path';
import memoize from 'lodash/memoize';

const readdirSync = memoize(fs.readdirSync);

/**
 * Find a file in a directory, case-insensitive
 *
 * @param {string} filepath
 * @return {string|undefined} File path with correct case
 */
export default function findFileCaseInsensitive(filepath: string): string | undefined {
	const dir = path.dirname(filepath);
	const fileNameLower = path.basename(filepath).toLowerCase();
	const files = readdirSync(dir);
	const found = files.find(file => file.toLowerCase() === fileNameLower);
	return found && path.join(dir, found);
}

/**
 * Clear cache.
 */
export function clearCache() {
	(readdirSync.cache as any).clear();
}
