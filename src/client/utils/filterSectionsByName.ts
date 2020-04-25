import getFilterRegExp from './getFilterRegExp';
import filterComponentsByName from './filterComponentsByName';
import * as Rsg from '../../typings';

/**
 * Fuzzy filters sections by section or component name.
 *
 * @param {Array} sections
 * @param {string} query
 * @return {Array}
 */
export default function filterSectionsByName(
	sections: Rsg.TOCItem[],
	query: string
): Rsg.TOCItem[] {
	const regExp = getFilterRegExp(query);

	return sections
		.map(section => {
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
