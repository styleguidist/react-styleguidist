import React from 'react';
import { shallow, mount } from 'enzyme';
import config from '../../../scripts/schemas/config';
import ReactExample from '.';

const compilerConfig = config.compilerConfig.default;

// TODO: Enzyme → RTL

const evalInContext = (a: string) =>
	// eslint-disable-next-line no-new-func
	new Function('require', 'const React = require("react");' + a).bind(null, require);

const defaultProps = {
	evalInContext,
	onError: () => {},
	compilerConfig,
};

it('should render code', () => {
	const actual = shallow(<ReactExample {...defaultProps} code={'<button>OK</button>'} />);

	expect(actual).toMatchSnapshot();
});

it('should wrap code in Fragment when it starts with <', () => {
	const actual = mount(
		<div>
			<ReactExample {...defaultProps} code="<span /><span />" />
		</div>
	);

	expect(actual.html()).toMatchSnapshot();
});

it('should handle errors', () => {
	const onError = jest.fn();

	shallow(<ReactExample {...defaultProps} code={'<invalid code'} onError={onError} />);

	expect(onError).toHaveBeenCalledTimes(1);
});

it('should set initial state with hooks', () => {
	const code = `
const [count, setCount] = React.useState(0);
<button>{count}</button>
	`;
	const actual = mount(<ReactExample {...defaultProps} code={code} />);

	expect(actual.find('button').text()).toEqual('0');
});

it('should update state with hooks', () => {
	const code = `
const [count, setCount] = React.useState(0);
<button onClick={() => setCount(count+1)}>{count}</button>
	`;
	const actual = mount(<ReactExample {...defaultProps} code={code} />);
	actual.find('button').simulate('click');

	expect(actual.find('button').text()).toEqual('1');
});
