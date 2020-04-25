import { create } from 'jss';
import global from 'jss-plugin-global';
import isolate from 'jss-plugin-isolate';
import nested from 'jss-plugin-nested';
import camelCase from 'jss-plugin-camel-case';
import defaultUnit from 'jss-plugin-default-unit';
import compose from 'jss-plugin-compose';
import nonInheritedProps from './nonInheritedProps';

const createGenerateId = () => {
	let counter = 0;
	return (rule: { key: string }) => `rsg--${rule.key}-${counter++}`;
};

const jss = create({
	createGenerateId,
	plugins: [
		global(),
		isolate({
			reset: {
				// Reset all inherited and non-inherited properties
				...nonInheritedProps,

				// “Global” styles for all components
				boxSizing: 'border-box',

				// Allow inheritance because it may be set on body and should be available for user components
				color: 'inherit',
				font: 'inherit',
				fontFamily: 'inherit',
				fontSize: 'inherit',
				fontWeight: 'inherit',
				lineHeight: 'inherit',
			},
		}),
		nested(),
		camelCase(),
		defaultUnit(),
		compose(),
	],
});

export default jss;
