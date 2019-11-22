import getFilterRegExp from './getFilterRegExp';
import { RsgComponent } from '../../typings/RsgComponent';

/**
 * Fuzzy filters components list by component name.
 *
 * @param {array} components
 * @param {string} query
 * @return {array}
 */
export default function filterComponentsByName(
	components: RsgComponent[],
	query: string
): RsgComponent[] {
	const regExp = getFilterRegExp(query);
	return components.filter(({ name }) => regExp.test(name as string));
}
