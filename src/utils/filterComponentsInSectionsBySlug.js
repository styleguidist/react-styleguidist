import filterComponentsBySlug from './filterComponentsBySlug';

/**
 * Recursively filters all components in all sections by component slug.
 *
 * @param {object} sections
 * @param {string} slug
 * @return {Array}
 */
export default function filterComponentsInSectionsByExactName(sections, slug) {
	const components = [];
	sections.forEach(section => {
		if (section.components) {
			components.push(...filterComponentsBySlug(section.components, slug));
		}
		if (section.sections) {
			components.push(...filterComponentsInSectionsByExactName(section.sections, slug));
		}
	});
	return components;
}
