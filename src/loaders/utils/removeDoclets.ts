// Doclet regexp from react-docgen
const DOCLET_REGEXP = /^@(\w+)(?:$|\s((?:[^](?!^@\w))*))/gim;

/**
 * Remove all doclets (e.g. `@example Foo.js`) from text.
 * @param {string} text
 * @returns {string}
 */
export default function removeDoclets(text: string) {
	return text.replace(DOCLET_REGEXP, '');
}
