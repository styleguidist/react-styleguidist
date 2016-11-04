import test from 'ava';
import React from 'react';
import ComponentsListRenderer from './ComponentsListRenderer';

const components = [
	{
		name: 'Button',
	},
	{
		name: 'Input',
	},
	{
		name: 'Textarea',
	},
];

test('should render sections with nested components', () => {
	const actual = shallow(
		<ComponentsListRenderer items={components} />
	);

	expect(actual.node, 'to contain',
		<div>
			<div>Button</div>
			<div>Input</div>
			<div>Textarea</div>
		</div>
	);
});
