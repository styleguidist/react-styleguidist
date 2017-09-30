import React from 'react';
import { ComponentsListRenderer } from './ComponentsListRenderer';

it('should render sections with nested components', () => {
	const components = [
		{
			name: 'Button',
			slug: 'button',
		},
		{
			name: 'Input',
			slug: 'input',
		},
	];
	const actual = shallow(<ComponentsListRenderer items={components} classes={{}} />);

	expect(actual).toMatchSnapshot();
});

it('should return null when the list is empty', () => {
	const actual = shallow(<ComponentsListRenderer items={[]} classes={{}} />);

	expect(actual.getElement()).toBe(null);
});

it('should ignore items without name', () => {
	const components = [
		{
			name: 'Button',
			slug: 'button',
		},
		{
			slug: 'input',
		},
	];
	const actual = shallow(<ComponentsListRenderer items={components} classes={{}} />);

	expect(actual).toMatchSnapshot();
});
