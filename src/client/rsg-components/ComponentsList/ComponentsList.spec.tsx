/* eslint-disable compat/compat */
import React from 'react';
import { render } from '@testing-library/react';
import ComponentsList from './ComponentsList';
import Context from '../Context';

const context = {
	config: {
		pagePerSection: true,
		tocMode: 'collapse',
	},
};

const Provider = (props: any) => <Context.Provider value={context} {...props} />;

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
			<ComponentsList items={components} />
		</Provider>
	);

	expect(Array.from(getAllByRole('link')).map(node => (node as HTMLAnchorElement).href)).toEqual([
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
			<ComponentsList items={components} />
		</Provider>
	);

	expect(Array.from(getAllByRole('link')).map(node => (node as HTMLAnchorElement).href)).toEqual([
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
			<ComponentsList items={components} useRouterLinks hashPath={['Components']} useHashId />
		</Provider>
	);

	expect(Array.from(getAllByRole('link')).map(node => (node as HTMLAnchorElement).href)).toEqual([
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
				useRouterLinks
				hashPath={['Components']}
				useHashId={false}
			/>
		</Provider>
	);

	expect(Array.from(getAllByRole('link')).map(node => (node as HTMLAnchorElement).href)).toEqual([
		'http://localhost/#/Components/Button',
		'http://localhost/#/Components/Input',
	]);
});

it('should not render any links when the list is empty', () => {
	const { queryAllByRole } = render(
		<Provider>
			<ComponentsList items={[]} />
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
				useRouterLinks
				hashPath={['Components']}
				useHashId={false}
			/>
		</Provider>
	);

	expect(Array.from(getAllByRole('link')).map(node => (node as HTMLAnchorElement).href)).toEqual([
		'http://localhost/#button',
	]);
});

it('should show content of items that are open and not what is closed', () => {
	const components = [
		{
			visibleName: 'Button',
			name: 'Button',
			slug: 'button',
			content: <ul data-testid="content-button">Content for Button</ul>,
		},
		{
			visibleName: 'Input',
			name: 'Input',
			slug: 'input',
			content: <ul data-testid="content-input">Content for Input</ul>,
		},
	];

	const { getByTestId, getByText } = render(
		<Provider>
			<ComponentsList
				items={components}
				useRouterLinks
				hashPath={['Components']}
				useHashId={false}
			/>
		</Provider>
	);

	getByText('Button').click();

	expect(getByTestId('content-input')).not.toBeVisible();
});

it('should show content of initialOpen items even if they are not active', () => {
	const components = [
		{
			visibleName: 'Button',
			name: 'Button',
			slug: 'button',
			content: <div data-testid="content">Content for Button</div>,
		},
		{
			visibleName: 'Input',
			name: 'Input',
			slug: 'input',
			content: <div data-testid="content">Content for Input</div>,
			initialOpen: true,
		},
	];

	const { getAllByTestId, getByText } = render(
		<Provider>
			<ComponentsList
				items={components}
				useRouterLinks
				hashPath={['Components']}
				useHashId={false}
			/>
		</Provider>
	);

	getByText('Button').click();

	expect(
		Array.from(getAllByTestId('content')).map(node => (node as HTMLDivElement).innerHTML)
	).toEqual(['Content for Button', 'Content for Input']);
});
