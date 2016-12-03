import React from 'react';
import { ComponentsListRenderer } from './ComponentsListRenderer';

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

it('should render sections with nested components', () => {
	const actual = shallow(
		<ComponentsListRenderer items={components} classes={{}} />
	);

	expect(shallowToJson(actual)).toMatchSnapshot();
});

it('should return null when the list is empty', () => {
	const actual = shallow(
		<ComponentsListRenderer classes={{}} items={[]} />
	);

	expect(actual.node).toBe(null);
});
