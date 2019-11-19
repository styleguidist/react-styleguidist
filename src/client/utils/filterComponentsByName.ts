import getFilterRegExp from './getFilterRegExp';
import { ComponentViewModel } from '../rsg-components/ReactComponent';

/**
 * Fuzzy filters components list by component name.
 *
 * @param {array} components
 * @param {string} query
 * @return {array}
 */
export default function filterComponentsByName(
	components: ComponentViewModel[],
	query: string
): ComponentViewModel[] {
	const regExp = getFilterRegExp(query);
	return components.filter(({ name }) => regExp.test(name as string));
}
