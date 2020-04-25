import path from 'path';

/**
 * Return user’s package.json.
 *
 * @return {object}
 */
export default function getUserPackageJson() {
	try {
		return require(path.resolve(process.cwd(), 'package.json'));
	} catch (err) {
		return {};
	}
}
