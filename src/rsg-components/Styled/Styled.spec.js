import test from 'ava';
import React, { Component } from 'react';
import Styled from './Styled';

/* eslint-disable react/prefer-stateless-function, react/prop-types */

const styles = () => ({
	foo: {
		color: 'red',
	},
});

class Cmpnt extends Component {
	render() {
		return (
			<div className={this.props.classes.foo}></div>
		);
	}
}

test('should wrap a component and pass classes', t => {
	const WrappedComponent = Styled(styles)(Cmpnt);

	const actual = shallow(
		<WrappedComponent bar="baz" />,
		{
			context: {
				config: {
					theme: {},
					styles: {},
				},
			},
		}
	);

	t.is(actual.name(), 'Cmpnt');
	t.is(actual.prop('bar'), 'baz');
	t.is(typeof actual.prop('classes'), 'object');
	t.regex(actual.prop('classes').foo, /^foo-\d+$/);
});
