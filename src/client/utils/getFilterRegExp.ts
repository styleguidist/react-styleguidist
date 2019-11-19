/**
 * RegExp to fuzzy filter components list by component name.
 *
 * @param {string} query
 * @return {RegExp}
 */
export default function getFilterRegExp(query: string): RegExp {
	query = query
		.replace(/[^a-z0-9]/gi, '')
		.split('')
		.join('.*');
	return new RegExp(query, 'i');
}
