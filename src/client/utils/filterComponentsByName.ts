import getFilterRegExp from './getFilterRegExp';
import * as Rsg from '../../typings';

/**
 * Fuzzy filters components list by component name.
 *
 * @param {array} components
 * @param {string} query
 * @return {array}
 */
export default function filterComponentsByName(
	components: Rsg.Component[],
	query: string
): Rsg.Component[] {
	const regExp = getFilterRegExp(query);
	return components.filter(({ name }) => regExp.test(name as string));
}
