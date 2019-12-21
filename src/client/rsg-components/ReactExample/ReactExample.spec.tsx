import React from 'react';
import { shallow, mount } from 'enzyme';
import noop from 'lodash/noop';
import ReactExample from '.';

const evalInContext = (a: string): (() => any) =>
	// eslint-disable-next-line no-new-func
	new Function('require', 'const React = require("react");' + a).bind(null, require);

it('should render code', () => {
	const actual = shallow(
		<ReactExample code={'<button>OK</button>'} evalInContext={evalInContext} onError={noop} />
	);

	expect(actual).toMatchSnapshot();
});

it('should wrap code in Fragment when it starts with <', () => {
	const actual = mount(
		<div>
			<ReactExample code="<span /><span />" evalInContext={evalInContext} onError={noop} />
		</div>
	);

	expect(actual.html()).toMatchSnapshot();
});

it('should handle errors', () => {
	const onError = jest.fn();

	shallow(<ReactExample code={'<invalid code'} evalInContext={evalInContext} onError={onError} />);

	expect(onError).toHaveBeenCalledTimes(1);
});

it('should set initial state with hooks', () => {
	const code = `
const [count, setCount] = React.useState(0);
<button>{count}</button>
	`;
	const actual = mount(<ReactExample code={code} evalInContext={evalInContext} onError={noop} />);

	expect(actual.find('button').text()).toEqual('0');
});

it('should update state with hooks', () => {
	const code = `
const [count, setCount] = React.useState(0);
<button onClick={() => setCount(count+1)}>{count}</button>
	`;
	const actual = mount(<ReactExample code={code} evalInContext={evalInContext} onError={noop} />);
	actual.find('button').simulate('click');

	expect(actual.find('button').text()).toEqual('1');
});
