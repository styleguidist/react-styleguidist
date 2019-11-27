/**
 * Filter out components without an example file.
 *
 * @param {Array} sections
 * @returns {Array}
 */
interface ProcessedSections extends Rsg.Section {
	sections: ProcessedSections[];
	components: Rsg.Component[];
}

export default function filterComponentsWithExample(
	sections: ProcessedSections[]
): ProcessedSections[] {
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
