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
		codeRevision: 0,
	},
};

const console$error = console.error;
const console$clear = console.clear;

afterEach(() => {
	console.error = console$error;
	console.clear = console$clear;
});

it('should unmount Wrapper component', () => {
	const actual = mount(<Preview code={code} evalInContext={evalInContext} />, options);

	expect(actual.html()).toMatch('<button');
	actual.unmount();
	expect(actual.html()).toBe(null);
});

it('should not not fail when Wrapper wasn’t mounted', () => {
	console.error = jest.fn();

	const actual = mount(<Preview code="pizza" evalInContext={evalInContext} />, options);
	const node = actual.instance().mountNode;

	expect(console.error).toHaveBeenCalled();
	expect(node.innerHTML).toBe('');
	actual.unmount();
	expect(node.innerHTML).toBe('');
});

it('should render component renderer', () => {
	const actual = shallow(<Preview code={code} evalInContext={evalInContext} />, {
		...options,
		disableLifecycleMethods: true,
	});

	expect(actual).toMatchSnapshot();
});

it('should not clear console on initial mount', () => {
	console.clear = jest.fn();
	mount(<Preview code={code} evalInContext={evalInContext} />, options);
	expect(console.clear).toHaveBeenCalledTimes(0);
});

it('should clear console on second mount', () => {
	console.clear = jest.fn();
	mount(<Preview code={code} evalInContext={evalInContext} />, {
		context: { ...options.context, codeRevision: 1 },
	});
	expect(console.clear).toHaveBeenCalledTimes(1);
});
