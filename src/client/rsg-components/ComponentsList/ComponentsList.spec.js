import React from 'react';
import { render } from '@testing-library/react';
import ComponentsList from './ComponentsList';
import Context from '../Context';

const context = {
	config: {
		pagePerSection: true,
	},
};

const Provider = props => <Context.Provider value={context} {...props} />;

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

	const { getAllByRole } = render(
		<Provider>
			<ComponentsList items={components} classes={{}} />
		</Provider>
	);

	expect(Array.from(getAllByRole('link')).map(node => node.href)).toEqual([
		'http://localhost/#button',
		'http://localhost/#input',
	]);
});

it('if a custom href is provided, should use it instead of generating internal link', () => {
	const components = [
		{
			visibleName: 'External example',
			name: 'External example',
			href: 'http://example.com/',
		},
		{
			visibleName: 'Input',
			name: 'Input',
			slug: 'input',
		},
	];

	const { getAllByRole } = render(
		<Provider>
			<ComponentsList items={components} classes={{}} />
		</Provider>
	);

	expect(Array.from(getAllByRole('link')).map(node => node.href)).toEqual([
		'http://example.com/',
		'http://localhost/#input',
	]);
});

it('should set an id parameter on link when useHashId is activated', () => {
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

	const { getAllByRole } = render(
		<Provider>
			<ComponentsList
				items={components}
				classes={{}}
				useRouterLinks
				hashPath={['Components']}
				useHashId
			/>
		</Provider>
	);

	expect(Array.from(getAllByRole('link')).map(node => node.href)).toEqual([
		'http://localhost/#/Components?id=button',
		'http://localhost/#/Components?id=input',
	]);
});

it('should set a sub route on link when useHashId is deactivated', () => {
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

	const { getAllByRole } = render(
		<Provider>
			<ComponentsList
				items={components}
				classes={{}}
				useRouterLinks
				hashPath={['Components']}
				useHashId={false}
			/>
		</Provider>
	);

	expect(Array.from(getAllByRole('link')).map(node => node.href)).toEqual([
		'http://localhost/#/Components/Button',
		'http://localhost/#/Components/Input',
	]);
});

it('should not render any links when the list is empty', () => {
	const { queryAllByRole } = render(
		<Provider>
			<ComponentsList items={[]} classes={{}} />
		</Provider>
	);

	expect(queryAllByRole('link')).toHaveLength(0);
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

	const { getAllByRole } = render(
		<Provider>
			<ComponentsList
				items={components}
				classes={{}}
				useRouterLinks
				hashPath={['Components']}
				useHashId={false}
			/>
		</Provider>
	);

	expect(Array.from(getAllByRole('link')).map(node => node.href)).toEqual([
		'http://localhost/#button',
	]);
});
