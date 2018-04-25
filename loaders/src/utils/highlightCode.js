const hljs = require('highlight.js');

/**
 * Highlight code.
 *
 * @param {string} code
 * @param {string} [lang]
 * @returns {string}
 */
module.exports = function highlightCode(code, lang) {
	try {
		if (lang) {
			return hljs.highlight(lang, code).value;
		}
		return hljs.highlightAuto(code).value;
	} catch (err) {
		return err.message;
	}
};
