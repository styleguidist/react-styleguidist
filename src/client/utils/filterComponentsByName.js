import getFilterRegExp from './getFilterRegExp';

/**
 * Fuzzy filters components list by component name.
 *
 * @param {array} components
 * @param {string} query
 * @return {array}
 */
export default function filterComponentsByName(components, query) {
	const regExp = getFilterRegExp(query);
	return components.filter(({ name }) => regExp.test(name));
}
