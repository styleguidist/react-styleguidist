/**
 * Recursively finds a section with a given name (exact match)
 *
 * @param  {Array}  sections
 * @param  {string} name
 * @return {object}
 */
export default function findSection(sections, name) {
	let found;
	sections.forEach(section => {
		if (section.name === name) {
			found = section;
		} else if (section.sections && section.sections.length) {
			found = findSection(section.sections, name) || found;
		}
	});

	return found;
}
