import test from 'ava';
import React from 'react';
import Wrapper from './Wrapper';

test('should render children', () => {
	const children = <span>Hello</span>;
	const actual = shallow(
		<Wrapper>{children}</Wrapper>
	);

	expect(actual.node, 'to contain',
		children
	);
});
