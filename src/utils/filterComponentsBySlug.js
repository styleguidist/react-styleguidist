/**
 * Filters list of components by component slug.
 *
 * @param {Array} components
 * @param {string} slug
 * @return {Array}
 */
export default function filterComponentsBySlug(components, slug) {
	return components.filter(component => component.slug === slug);
}
