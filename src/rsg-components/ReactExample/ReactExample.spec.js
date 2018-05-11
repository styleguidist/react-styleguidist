import React from 'react';
import noop from 'lodash/noop';
import ReactExample from '../ReactExample';

const evalInContext = a =>
	// eslint-disable-next-line no-new-func
	new Function('require', 'state', 'setState', 'const React = require("react");' + a).bind(
		null,
		require
	);

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

it('should set initialState before the first render', () => {
	const code = `
initialState = {count:1};
<span>{state.count}</span>
	`;
	const actual = mount(<ReactExample code={code} evalInContext={evalInContext} onError={noop} />);
	expect(actual.html()).toMatchSnapshot();
});

it('should update state on setState', done => {
	const code = `
initialState = {count:1};
setTimeout(() => state.count === 1 && setState({count:2}));
<button>{state.count}</button>
	`;
	const actual = mount(<ReactExample code={code} evalInContext={evalInContext} onError={noop} />);

	actual.find('button').simulate('click');

	setTimeout(() => {
		try {
			expect(actual.html()).toMatchSnapshot();
			done();
		} catch (err) {
			done.fail(err);
		}
	});
});
