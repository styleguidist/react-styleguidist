const COMPONENT_PLACEHOLDER = '__COMPONENT__';
const COMPONENT_PLACEHOLDER_REGEXP = new RegExp(COMPONENT_PLACEHOLDER, 'g');

/**
 * Prepares default example:
 *
 * 1. Replaces the __COMPONENT__ placeholder with the component name.
 * 2. Wraps the code in a fenced JS code block.
 */
export default function expandDefaultComponent(source: string, componentName: string): string {
	const code = source.replace(COMPONENT_PLACEHOLDER_REGEXP, componentName);
	return '```js\n' + code + '\n```';
}
