import React, { Component } from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Styled, { JssInjectedProps } from './Styled';
import Context from '../Context';

const context = {
	config: {
		theme: {},
		styles: {},
	},
};

const Provider = (props: any) => <Context.Provider value={context} {...props} />;

/* eslint-disable react/prefer-stateless-function, react/prop-types */

const styles = () => ({
	foo: {
		color: 'red',
	},
});

interface MockProps extends JssInjectedProps {
	testId?: string;
}

class TestRenderer extends Component<MockProps> {
	public render() {
		return <div className={this.props.classes.foo} data-testid={this.props.testId} />;
	}
}

test('should set displayName', () => {
	const WrappedComponent = Styled(styles)(TestRenderer);
	expect(WrappedComponent.displayName).toBe('Styled(Test)');
});

test('should wrap a component and pass props and classes', () => {
	const WrappedComponent = Styled<MockProps>(styles)(TestRenderer);
	const { getByTestId } = render(
		<Provider>
			<WrappedComponent testId="element" />
		</Provider>
	);
	expect(getByTestId('element')).toHaveAttribute('class', expect.stringMatching(/^rsg--foo-\d+$/));
});
