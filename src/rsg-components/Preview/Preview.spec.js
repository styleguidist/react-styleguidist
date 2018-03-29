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

it('should wrap code in Fragment when it starts with <', () => {
	console.error = jest.fn();

	const actual = mount(<Preview code="<span /><span />" evalInContext={evalInContext} />, options);

	// If two spans weren't wrapped in a Fragment, we'd see an error in console
	expect(console.error).not.toHaveBeenCalled();
	expect(actual.html()).toMatchSnapshot();
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

it('should set initialState before the first render', () => {
	const code = `
initialState = {count:1};
<span>{state.count}</span>
	`;
	const actual = mount(<Preview code={code} evalInContext={evalInContext} />, options);
	expect(actual.html()).toMatchSnapshot();
});

it('should update state on setState', done => {
	const code = `
initialState = {count:1};
setTimeout(() => state.count === 1 && setState({count:2}));
<button>{state.count}</button>
	`;
	const actual = mount(<Preview code={code} evalInContext={evalInContext} />, options);

	actual
		.instance()
		.mountNode.querySelector('button')
		.click();

	setTimeout(() => {
		try {
			expect(actual.html()).toMatchSnapshot();
			done();
		} catch (err) {
			done.fail(err);
		}
	});
});
