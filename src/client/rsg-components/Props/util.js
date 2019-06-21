/**
 * Remove quotes around given string.
 *
 * @param {string} string
 * @returns {string}
 */
export function unquote(string) {
	return string && string.replace(/^['"]|['"]$/g, '');
}

/**
 * Return prop type object.
 *
 * @param {object} prop
 * @returns {object}
 */
export function getType(prop) {
	const typedProp = prop.flowType || prop.tsType;
	if (typedProp) {
		if (typedProp.name === 'union' && typedProp.elements.every(elem => elem.name === 'literal')) {
			return {
				...typedProp,
				name: 'enum',
				value: typedProp.elements,
			};
		}
		return typedProp;
	}
	return prop.type;
}

/**
 * Show starting and ending whitespace around given string.
 *
 * @param {string} string
 * @returns {string}
 */
export function showSpaces(string) {
	return string && string.replace(/^\s|\s$/g, '␣');
}
