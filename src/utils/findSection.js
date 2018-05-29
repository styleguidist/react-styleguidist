/**
 * Recursively finds a section with a given slug (exact match)
 *
 * @param  {Array}  sections
 * @param  {string} slug
 * @return {object}
 */
export default function findSection(sections, slug) {
	const found = sections.find(section => section.slug === slug);
	if (found) {
		return found;
	}

	for (const section of sections) {
		if (!section.sections || section.sections.length === 0) {
			continue;
		}
		const found = findSection(section.sections, slug);
		if (found) {
			return found;
		}
	}

	return undefined;
}
