import filterComponentsByExactName from './filterComponentsByExactName';

/**
 * Recursively filters all components in all sections by component name.
 *
 * @param {object} sections
 * @param {string} name
 * @return {Array} sections
 */
export default function filterComponentsInSectionsByExactName(sections, name) {
	const output = [];
	sections.forEach(section => {
		if (section.components) {
			const components = filterComponentsByExactName(section.components, name);
			if (components.length) {
				output.push({
					codeSamples: section.codeSamples,
					propsMethods: section.propsMethods,
					components,
				});
			}
		}
		if (section.sections) {
			output.push(...filterComponentsInSectionsByExactName(section.sections, name));
		}
	});
	return output;
}
