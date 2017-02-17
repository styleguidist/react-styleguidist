import React from 'react';
import { ComponentsListRenderer } from './ComponentsListRenderer';

const components = [
	{
		name: 'Button',
		slug: 'button',
	},
	{
		name: 'Input',
		slug: 'input',
	},
	{
		name: 'Textarea',
		slug: 'textarea',
	},
];

it('should render sections with nested components', () => {
	const actual = shallow(
		<ComponentsListRenderer items={components} classes={{}} />
	);

	expect(actual).toMatchSnapshot();
});

it('should return null when the list is empty', () => {
	const actual = shallow(
		<ComponentsListRenderer classes={{}} items={[]} />
	);

	expect(actual.node).toBe(null);
});
