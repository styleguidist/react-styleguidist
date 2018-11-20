// @flow
import lowercaseKeys from 'lowercase-keys';
import { DOCS_DOCUMENTING } from '../../scripts/consts';

type Example = {
	content: string,
	lang: ?string,
	settings: {},
};

type Error = {
	error: string,
};

type UpdateExampleFn = (example: Example) => Example;

const hasStringModifiers = (modifiers: string): boolean => !!modifiers.match(/^[ \w]+$/);

/**
 * Split fenced code block header to lang and modifiers, parse modifiers, lowercase modifier keys, etc.
 */
export default function parseExample(
	content: string,
	lang: ?string,
	modifiers: ?string,
	updateExample: UpdateExampleFn = x => x
): Example | Error {
	const example = {
		content,
		lang,
		settings: {},
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
					error: `Cannot parse modifiers for "${modifiers}". Use space-separated strings or JSON:\n\n${DOCS_DOCUMENTING}`,
				};
			}
		}
	}

	const updatedExample = updateExample(example);
	return {
		...updatedExample,
		settings: lowercaseKeys(updatedExample.settings),
	};
}
