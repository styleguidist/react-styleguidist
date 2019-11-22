import getFilterRegExp from './getFilterRegExp';
import filterComponentsByName from './filterComponentsByName';

/**
 * Fuzzy filters sections by section or component name.
 *
 * @param {Array} sections
 * @param {string} query
 * @return {Array}
 */
export default function filterSectionsByName(
	sections: (Rsg.Section | Rsg.Component)[],
	query: string
): Rsg.Section[] {
	const regExp = getFilterRegExp(query);

	return sections
		.map(sectionOrComponent => {
			const section = sectionOrComponent as Rsg.Section;
			return {
				...section,
				sections: section.sections ? filterSectionsByName(section.sections, query) : [],
				components: section.components ? filterComponentsByName(section.components, query) : [],
			};
		})
		.filter(
			section =>
				section.components.length > 0 ||
				section.sections.length > 0 ||
				regExp.test(section.name || '-')
		);
}
