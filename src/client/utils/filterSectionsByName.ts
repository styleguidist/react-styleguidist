import getFilterRegExp from './getFilterRegExp';
import filterComponentsByName from './filterComponentsByName';
import { RsgComponent } from '../../typings/RsgComponent';
import { RsgSection } from '../../typings/RsgSection';

/**
 * Fuzzy filters sections by section or component name.
 *
 * @param {Array} sections
 * @param {string} query
 * @return {Array}
 */
export default function filterSectionsByName(
	sections: (RsgSection | RsgComponent)[],
	query: string
): RsgSection[] {
	const regExp = getFilterRegExp(query);

	return sections
		.map(sectionOrComponent => {
			const section = sectionOrComponent as RsgSection;
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
