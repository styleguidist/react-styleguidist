import processComponents from './processComponents';

/**
 * Recursively process each component in all sections.
 *
 * @param {Array} sections
 * @return {Array}
 */
export default function processSections(sections: Rsg.Section[]): Rsg.Section[] {
	return sections.map(section => ({
		...section,
		visibleName: section.name,
		components: processComponents(section.components || []),
		sections: processSections(section.sections || []),
	}));
}
