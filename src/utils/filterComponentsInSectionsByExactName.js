import filterComponentsByExactName from './filterComponentsByExactName';

/**
 * Recursively filters all components in all sections by component name.
 *
 * @param {object} sections
 * @param {string} name
 * @return {Array}
 */
export default function filterComponentsInSectionsByExactName(sections, name) {
	const filteredSections = [];
	sections.forEach(section => {
		if (section.components) {
			const filteredComponents = filterComponentsByExactName(section.components, name);
			if (filteredComponents.length) {
				filteredSections.push({
					exampleModes: section.exampleModes,
					usageModes: section.usageModes,
					components: filteredComponents,
				});
			}
		}
		if (section.sections) {
			filteredSections.push(...filterComponentsInSectionsByExactName(section.sections, name));
		}
	});
	return filteredSections;
}
