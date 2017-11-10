'use strict';

const consts = require('../../scripts/consts');
const lowercaseKeys = require('lowercase-keys');

const splitLangAndModifiers = header => {
	const m = (header || '').match(/(\w*)(?: (.*))?/);
	return { lang: m[1], modifiers: m[2] };
};

const hasStringModifiers = modifiers => modifiers.match(/^[ \w]+$/);

/**
 * Split fenced code block header to lang and modifiers, parse modifiers, lowercase modifier keys, etc.
 *
 * @param {string} content
 * @param {string} header
 * @param {function} updateExample
 * @returns {object}
 */
module.exports = function parseExample(content, header, updateExample) {
	const split = splitLangAndModifiers(header);
	const modifiers = split.modifiers;

	let example = {
		lang: split.lang,
		settings: {},
		content,
	};

	if (modifiers) {
		if (hasStringModifiers(modifiers)) {
			example.settings = modifiers.split(' ').reduce((obj, modifier) => {
				obj[modifier] = true;
				return obj;
			}, {});
		} else {
			try {
				example.settings = JSON.parse(modifiers);
			} catch (err) {
				return {
					error: `Cannot parse modifiers for "${header}". Use space-separated strings or JSON:\n\n${
						consts.DOCS_DOCUMENTING
					}`,
				};
			}
		}
	}

	if (updateExample) {
		example = updateExample(example);
	}

	example.settings = lowercaseKeys(example.settings);

	return example;
};
