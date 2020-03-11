import * as Rsg from '../../typings';

/**
 * Filter out components without an example file.
 *
 * @param {Array} sections
 * @returns {Array}
 */
export default function filterComponentsWithExample(
	sections: Rsg.LoaderSection[]
): Rsg.LoaderSection[] {
	return sections
		.map(section => ({
			...section,
			sections: filterComponentsWithExample(section.sections),
			components: section.components.filter(component => component.hasExamples),
		}))
		.filter(
			section => section.components.length > 0 || section.sections.length > 0 || section.content
		);
}
