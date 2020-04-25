import getComponentFiles from './getComponentFiles';
import * as Rsg from '../../typings';

/**
 * Return absolute paths of all components in sections.
 *
 * @param {Array} sections
 * @param {string} rootDir
 * @param {Array} [ignore] Glob patterns to ignore.
 * @returns {Array}
 */
export default function getComponentFilesFromSections(
	sections: Rsg.ConfigSection[],
	rootDir?: string,
	ignore?: string[]
): string[] {
	return sections.reduce((components: string[], section) => {
		if (section.components) {
			return components.concat(getComponentFiles(section.components, rootDir, ignore));
		}

		if (section.sections) {
			return components.concat(getComponentFilesFromSections(section.sections, rootDir, ignore));
		}

		return components;
	}, []);
}
