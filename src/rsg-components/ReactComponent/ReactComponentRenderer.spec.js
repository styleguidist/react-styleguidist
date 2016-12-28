import test from 'ava';
import React from 'react';
import ReactComponentRenderer from './ReactComponentRenderer';

test('should render props section', () => {
	const actual = shallow(
		<ReactComponentRenderer
			name="Test"
			pathLine="test"
			props={<div>test</div>}
		/>
	);

	expect(actual.node, 'to contain',
		<h3>Props</h3>
	);
});

test('should not render props section if there are no props', () => {
	const actual = shallow(
		<ReactComponentRenderer
			name="Test"
			pathLine="test"
		/>
	);

	expect(actual.node, 'not to contain',
		<h3>Props</h3>
	);
});
