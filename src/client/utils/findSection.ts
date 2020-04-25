import find from 'lodash/find';
import * as Rsg from '../../typings';

/**
 * Recursively finds a section with a given name (exact match)
 *
 * @param  {Array}  sections
 * @param  {string} name
 * @return {object}
 */
export default function findSection(
	sections: Rsg.Section[],
	name: string
): Rsg.Section | undefined {
	// We're using Lodash because IE11 doesn't support Array.find.
	const found = find(sections, { name });
	if (found) {
		return found;
	}

	for (let i = 0; i < sections.length; i++) {
		const section = sections[i];
		if (!section.sections || section.sections.length === 0) {
			continue;
		}
		const foundInSubsection = findSection(section.sections, name);
		if (foundInSubsection) {
			return foundInSubsection;
		}
	}

	return undefined;
}
