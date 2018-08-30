import React from 'react';
import Preview from '../Preview';
import { Provider } from '../../provider';

/* eslint-disable no-console */

const evalInContext = a =>
	// eslint-disable-next-line no-new-func
	new Function('require', 'state', 'setState', 'const React = require("react");' + a).bind(
		null,
		require
	);
const code = '<button>OK</button>';
const newCode = '<button>Cancel</button>';
const context = {
	config: {
		compilerConfig: {},
	},
	codeRevision: 0,
};

const console$error = console.error;
const console$clear = console.clear;

afterEach(() => {
	console.error = console$error;
	console.clear = console$clear;
});

it('should unmount Wrapper component', () => {
	const actual = mount(
		<Provider {...context}>
			<Preview code={code} evalInContext={evalInContext} />
		</Provider>
	);

	expect(actual.html()).toMatch('<button');
	actual.unmount();
	expect(actual.html()).toBe(null);
});

it('should not not fail when Wrapper wasn’t mounted', () => {
	console.error = jest.fn();

	const actual = mount(
		<Provider {...context}>
			<Preview code="pizza" evalInContext={evalInContext} />
		</Provider>
	);
	const node = actual.instance().mountNode;

	expect(console.error).toHaveBeenCalled();
	expect(node.innerHTML).toBe('');
	actual.unmount();
	expect(node.innerHTML).toBe('');
});

it('should wrap code in Fragment when it starts with <', () => {
	console.error = jest.fn();

	const actual = mount(
		<Provider {...context}>
			<Preview code="<span /><span />" evalInContext={evalInContext} />
		</Provider>
	);

	// If two spans weren't wrapped in a Fragment, we'd see an error in console
	expect(console.error).not.toHaveBeenCalled();
	expect(actual.html()).toMatchSnapshot();
});

it('should render component renderer', () => {
	console.error = jest.fn();

	const actual = shallow(
		<Provider {...context}>
			<Preview code={code} evalInContext={evalInContext} />
		</Provider>,
		{
			disableLifecycleMethods: true,
		}
	);

	expect(actual).toMatchSnapshot();
});

it('should update', () => {
	const actual = mount(
		<Provider {...context}>
			<Preview code={code} evalInContext={evalInContext} />
		</Provider>
	);

	actual.setProps({ code: newCode });

	expect(actual.html()).toMatchSnapshot();
});

it('should handle no code', () => {
	const actual = mount(
		<Provider {...context}>
			<Preview code="" evalInContext={evalInContext} />
		</Provider>
	);

	expect(actual.html()).toMatchSnapshot();
});

it('should handle errors', () => {
	console.error = jest.fn();
	const actual = shallow(
		<Provider {...context}>
			<Preview code={'<invalid code'} evalInContext={evalInContext} />
		</Provider>
	);

	expect(actual).toMatchSnapshot();
	expect(console.error).toHaveBeenCalledTimes(1);
});

it('should not clear console on initial mount', () => {
	console.clear = jest.fn();
	mount(
		<Provider {...context}>
			<Preview code={code} evalInContext={evalInContext} />
		</Provider>
	);
	expect(console.clear).toHaveBeenCalledTimes(0);
});

it('should clear console on second mount', () => {
	console.clear = jest.fn();
	mount(
		<Provider {...context} codeRevision={1}>
			<Preview code={code} evalInContext={evalInContext} />
		</Provider>
	);
	expect(console.clear).toHaveBeenCalledTimes(1);
});
