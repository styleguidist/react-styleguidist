import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import noop from 'lodash/noop';
import renderer from 'react-test-renderer';
import { createRenderer } from 'react-test-renderer/shallow';
import ReactExample from '.';

const evalInContext = (a: string): (() => any) =>
	// eslint-disable-next-line no-new-func
	new Function('require', 'const React = require("react");' + a).bind(null, require);

it('should render code', () => {
	const testRenderer = createRenderer();
	testRenderer.render(
		<ReactExample code={'<button>OK</button>'} evalInContext={evalInContext} onError={noop} />
	);

	expect(testRenderer.getRenderOutput()).toMatchSnapshot();
});

it('should wrap code in Fragment when it starts with <', () => {
	const actual = renderer.create(
		<div>
			<ReactExample code="<span /><span />" evalInContext={evalInContext} onError={noop} />
		</div>
	);

	expect(actual.toJSON()).toMatchSnapshot();
});

it('should handle errors', () => {
	const onError = jest.fn();

	const testRenderer = createRenderer();
	testRenderer.render(
		<ReactExample code={'<invalid code'} evalInContext={evalInContext} onError={onError} />
	);

	expect(onError).toHaveBeenCalledTimes(1);
});

it('should set initial state with hooks', () => {
	const code = `
const [count, setCount] = React.useState(0);
<button>{count}</button>
	`;
	const { getByRole } = render(
		<ReactExample code={code} evalInContext={evalInContext} onError={noop} />
	);

	expect(getByRole('button').textContent).toEqual('0');
});

it('should update state with hooks', () => {
	const code = `
const [count, setCount] = React.useState(0);
<button onClick={() => setCount(count+1)}>{count}</button>
	`;
	const { getByRole } = render(
		<ReactExample code={code} evalInContext={evalInContext} onError={noop} />
	);
	fireEvent.click(getByRole('button'));

	expect(getByRole('button').textContent).toEqual('1');
});
