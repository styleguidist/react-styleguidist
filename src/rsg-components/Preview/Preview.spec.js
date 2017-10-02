import React from 'react';
import Preview from '../Preview';

/* eslint-disable no-console */

const evalInContext = a =>
	new Function('require', 'const React = require("react");' + a).bind(null, require); // eslint-disable-line no-new-func
const code = '<button>OK</button>';
const options = {
	context: {
		config: {
			compilerConfig: {},
		},
	},
};

it('should unmount Wrapper component', () => {
	const actual = mount(<Preview code={code} evalInContext={evalInContext} />, options);
	const node = actual.instance().mountNode;

	expect(node.innerHTML).toMatch('<button');
	actual.unmount();
	expect(node.innerHTML).toBe('');
});

it('should not not fail when Wrapper wasn’t mounted', () => {
	const consoleError = console.error;
	console.error = () => {};

	const actual = mount(<Preview code="pizza" evalInContext={evalInContext} />, options);
	const node = actual.instance().mountNode;

	expect(node.innerHTML).toBe('');
	actual.unmount();
	expect(node.innerHTML).toBe('');

	console.error = consoleError;
});

it('should render component renderer', () => {
	const actual = shallow(
		<Preview code={code} evalInContext={evalInContext} />,
		Object.assign({}, options, { disableLifecycleMethods: true })
	);

	expect(actual).toMatchSnapshot();
});
