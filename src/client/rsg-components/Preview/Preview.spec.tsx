import React from 'react';
import { render, waitFor } from '@testing-library/react';
import Preview from '.';
import Context, { StyleGuideContextContents } from '../Context';

/* eslint-disable no-console */

const evalInContext = (a: string) =>
	// eslint-disable-next-line no-new-func
	new Function('require', 'state', 'setState', 'const React = require("react");' + a).bind(
		null,
		require
	);
const code = '<button>Code: OK</button>';
const newCode = '<button>Code: Cancel</button>';

const context = {
	config: {
		compilerConfig: {},
	},
	codeRevision: 0,
} as StyleGuideContextContents;

const Provider = (props: Record<string, any>) => <Context.Provider value={context} {...props} />;

const console$error = console.error;
const console$clear = console.clear;

afterEach(() => {
	console.error = console$error;
	console.clear = console$clear;
});

it('should unmount Wrapper component', async () => {
	const { unmount, getByTestId } = render(
		<Provider>
			<Preview code={code} evalInContext={evalInContext} />
		</Provider>
	);

	const node = getByTestId('mountNode');

	expect(node.innerHTML).toMatch('<button');
	unmount();
	await waitFor(() => expect(node.innerHTML).toBe(''));
});

it('should not fail when Wrapper wasn’t mounted', () => {
	const consoleError = jest.fn();
	console.error = consoleError;

	const { unmount, getByTestId } = render(
		<Provider>
			<Preview code="pizza" evalInContext={evalInContext} />
		</Provider>
	);

	const node = getByTestId('mountNode');

	expect(
		consoleError.mock.calls.find((call) =>
			call[0].toString().includes('ReferenceError: pizza is not defined')
		)
	).toBeTruthy();

	expect(node.innerHTML).toBe('');
	unmount();
	expect(node.innerHTML).toBe('');
});

it('should wrap code in Fragment when it starts with <', () => {
	console.error = jest.fn();

	const { queryAllByRole } = render(
		<Provider>
			<Preview code="<button /><button />" evalInContext={evalInContext} />
		</Provider>
	);

	// If two buttons weren't wrapped in a Fragment, we'd see an error in console
	expect(console.error).not.toHaveBeenCalled();
	expect(queryAllByRole('button')).toHaveLength(2);
});

it('should update', () => {
	const { rerender, getByText } = render(
		<Provider>
			<Preview code={code} evalInContext={evalInContext} />
		</Provider>
	);

	expect(getByText('Code: OK')).toBeInTheDocument();

	rerender(
		<Provider>
			<Preview code={newCode} evalInContext={evalInContext} />
		</Provider>
	);

	expect(getByText('Code: Cancel')).toBeInTheDocument();
});

it('should handle no code', () => {
	console.error = jest.fn();
	render(
		<Provider>
			<Preview code="" evalInContext={evalInContext} />
		</Provider>
	);

	expect(console.error).not.toHaveBeenCalled();
});

it('should handle errors', () => {
	const consoleError = jest.fn();

	console.error = consoleError;
	render(
		<Provider>
			<Preview code={'<invalid code'} evalInContext={evalInContext} />
		</Provider>
	);

	expect(
		consoleError.mock.calls.find((call) =>
			call[0].toString().includes('SyntaxError: Unexpected token')
		)
	).toBeTruthy();
});

it('should not clear console on initial mount', () => {
	console.clear = jest.fn();
	render(
		<Provider>
			<Preview code={code} evalInContext={evalInContext} />
		</Provider>
	);
	expect(console.clear).toHaveBeenCalledTimes(0);
});

it('should clear console on second mount', () => {
	console.clear = jest.fn();
	render(
		<Provider value={{ ...context, codeRevision: 1 }}>
			<Preview code={code} evalInContext={evalInContext} />
		</Provider>
	);
	expect(console.clear).toHaveBeenCalledTimes(1);
});
