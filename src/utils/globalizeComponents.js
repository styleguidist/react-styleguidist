import globalizeComponent from './globalizeComponent';

/**
 * Expose all components in all sections as global variables.
 *
 * @param {array} sections
 */
export default function globalizeComponents(sections) {
	sections.forEach(section => {
		if (section.components) {
			section.components.forEach(globalizeComponent);
		}
		if (section.sections) {
			globalizeComponents(section.sections);
		}
	});
}
