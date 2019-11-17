/**
 * Filters list of components by component name.
 *
 * @param {Array} components
 * @param {string} name
 * @return {Array}
 */
export default function filterComponentsByExactName(components, name) {
	return components.filter(component => component.name === name);
}
