import React, { Component } from 'react';
import Styled from './Styled';
import { Provider } from '../../provider';

/* eslint-disable react/prefer-stateless-function, react/prop-types */

const styles = () => ({
	foo: {
		color: 'red',
	},
});

class Cmpnt extends Component {
	render() {
		return <div className={this.props.classes.foo} />;
	}
}

it('should wrap a component and pass classes', () => {
	const WrappedComponent = Styled(styles)(Cmpnt);

	const context = {
		config: {
			theme: {},
			styles: {},
		},
	};
	const actual = shallow(
		<Provider {...context}>
			<WrappedComponent bar="baz" />
		</Provider>
	);

	expect(actual.name()).toBe('ContextProvider');
	expect(actual.prop('bar')).toBe('baz');
	expect(typeof actual.prop('classes')).toBe('object');
	expect(actual.prop('classes').foo).toMatch(/^rsg--foo-\d+$/);
});
