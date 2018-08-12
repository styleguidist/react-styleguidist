import { create } from 'jss';
import global from 'jss-global';
import isolate from 'jss-isolate';
import nested from 'jss-nested';
import camelCase from 'jss-camel-case';
import defaultUnit from 'jss-default-unit';
import compose from 'jss-compose';
import nonInheritedProps from './nonInheritedProps';

const createGenerateClassName = () => {
	let counter = 0;
	return rule => `rsg--${rule.key}-${counter++}`;
};

const jss = create({
	createGenerateClassName,
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
