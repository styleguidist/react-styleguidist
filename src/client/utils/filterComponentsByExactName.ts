import { ComponentViewModel } from '../rsg-components/ReactComponent';

/**
 * Filters list of components by component name.
 *
 * @param {Array} components
 * @param {string} name
 * @return {Array}
 */
export default function filterComponentsByExactName(
	components: ComponentViewModel[],
	name: string
): ComponentViewModel[] {
	return components.filter(component => component.name === name);
}
