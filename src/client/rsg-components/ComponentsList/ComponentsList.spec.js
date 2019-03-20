import React from 'react';
import ComponentsList from './ComponentsList';
import { ComponentsListRenderer } from './ComponentsListRenderer';

it('should set the correct href for items', () => {
	const components = [
		{
			visibleName: 'Button',
			name: 'Button',
			slug: 'button',
		},
		{
			visibleName: 'Input',
			name: 'Input',
			slug: 'input',
		},
	];

	const actual = shallow(<ComponentsList items={components} classes={{}} />);
	expect(actual).toMatchSnapshot();
});

it('if a custom href is provided, should use it instead of generating internal link', () => {
	const components = [
		{
			visibleName: 'External example',
			name: 'External example',
			href: 'http://example.com',
		},
		{
			visibleName: 'Input',
			name: 'Input',
			slug: 'input',
		},
	];

	const actual = shallow(<ComponentsList items={components} classes={{}} />);
	expect(actual).toMatchSnapshot();
});

it('should set a parameter on link when useHashId is activated', () => {
	const components = [
		{
			visibleName: 'Button',
			name: 'Button',
			slug: 'button',
		},
		{
			visibleName: 'Input',
			name: 'Input',
			slug: 'input',
		},
	];

	const actual = shallow(
		<ComponentsList
			items={components}
			classes={{}}
			useRouterLinks
			hashPath={['Components']}
			useHashId
		/>
	);
	expect(actual).toMatchSnapshot();
});

it('should set a sub route on link when useHashId is deactivated', () => {
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

	const actual = shallow(
		<ComponentsList
			items={components}
			classes={{}}
			useRouterLinks
			hashPath={['Components']}
			useHashId={false}
		/>
	);
	expect(actual).toMatchSnapshot();
});

it('should render sections with nested components', () => {
	const components = [
		{
			visibleName: 'Button',
			slug: 'button',
			href: '#button',
		},
		{
			visibleName: 'Input',
			slug: 'input',
			href: '#input',
		},
	];
	const actual = shallow(<ComponentsListRenderer items={components} classes={{}} />);

	expect(actual).toMatchSnapshot();
});

it('should return null when the list is empty', () => {
	const actual = shallow(<ComponentsListRenderer items={[]} classes={{}} />);

	expect(actual.getElement()).toBe(null);
});

it('should ignore items without visibleName', () => {
	const components = [
		{
			visibleName: 'Button',
			slug: 'button',
			href: '#button',
		},
		{
			slug: 'input',
			href: '#input',
		},
	];
	const actual = shallow(<ComponentsListRenderer items={components} classes={{}} />);

	expect(actual).toMatchSnapshot();
});
