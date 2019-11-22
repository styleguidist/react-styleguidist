import { RsgComponent } from '../../typings/RsgComponent';

/**
 * Filters list of components by component name.
 *
 * @param {Array} components
 * @param {string} name
 * @return {Array}
 */
export default function filterComponentsByExactName(
	components: RsgComponent[],
	name: string
): RsgComponent[] {
	return components.filter(component => component.name === name);
}
