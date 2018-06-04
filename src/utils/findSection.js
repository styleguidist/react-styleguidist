import find from 'lodash/find';

/**
 * Recursively finds a section with a given name (exact match)
 *
 * @param  {Array}  sections
 * @param  {string} name
 * @return {object}
 */
export default function findSection(sections, name) {
	let found = find(sections, { name });
	if (found) {
		return found;
	}

	sections.forEach(section => {
		if (section.sections && section.sections.length && !found) {
			found = findSection(section.sections, name) || found;
		}
	});

	return found;
}
