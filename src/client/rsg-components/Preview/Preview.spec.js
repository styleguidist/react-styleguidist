import React from 'react';
import Preview from '../Preview';

/* eslint-disable no-console */

const evalInContext = a =>
	// eslint-disable-next-line no-new-func
	new Function('require', 'state', 'setState', 'const React = require("react");' + a).bind(
		null,
		require
	);
const code = '<button>OK</button>';
const newCode = '<button>Cancel</button>';
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
	const node = actual.instance().mountNode;

	expect(node.innerHTML).toMatch('<button');
	actual.unmount();
	expect(node.innerHTML).toBe('');
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

it('should wrap code in Fragment when it starts with <', () => {
	console.error = jest.fn();

	const actual = mount(<Preview code="<span /><span />" evalInContext={evalInContext} />, options);

	// If two spans weren't wrapped in a Fragment, we'd see an error in console
	expect(console.error).not.toHaveBeenCalled();
	expect(actual.html()).toMatchSnapshot();
});

it('should render component renderer', () => {
	console.error = jest.fn();

	const actual = shallow(<Preview code={code} evalInContext={evalInContext} />, {
		...options,
		disableLifecycleMethods: true,
	});

	expect(actual).toMatchSnapshot();
});

it('should update', () => {
	const actual = mount(<Preview code={code} evalInContext={evalInContext} />, options);

	actual.setProps({ code: newCode });

	expect(actual.html()).toMatchSnapshot();
});

it('should handle no code', () => {
	const actual = mount(<Preview code="" evalInContext={evalInContext} />, options);

	expect(actual.html()).toMatchSnapshot();
});

it('should handle errors', () => {
	console.error = jest.fn();
	const actual = shallow(<Preview code={'<invalid code'} evalInContext={evalInContext} />, options);

	expect(actual).toMatchSnapshot();
	expect(console.error).toHaveBeenCalledTimes(1);
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
