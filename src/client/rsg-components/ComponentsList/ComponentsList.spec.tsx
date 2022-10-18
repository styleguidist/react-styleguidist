/* eslint-disable compat/compat */
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import ComponentsList from './ComponentsList';
import Context from '../Context';

const context = {
	config: {
		pagePerSection: true,
		tocMode: 'collapse',
	},
};

const Provider = (props: any) => <Context.Provider value={context} {...props} />;

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
			<ComponentsList items={components} />
		</Provider>
	);

	expect(Array.from(getAllByRole('link')).map((node) => (node as HTMLAnchorElement).href)).toEqual([
		'http://localhost/#button',
	]);
});

it('should show content of items that are open and not what is closed', () => {
	const components = [
		{
			visibleName: 'Button',
			name: 'Button',
			slug: 'button',
			href: '#buttton',
			content: <div data-testid="content">Content for Button</div>,
		},
		{
			visibleName: 'Input',
			name: 'Input',
			slug: 'input',
			href: '#input',
			content: <div data-testid="content">Content for Input</div>,
		},
	];

	const { getAllByTestId, getByText } = render(
		<Provider>
			<ComponentsList items={components} />
		</Provider>
	);

	fireEvent.click(getByText('Button'));

	expect(
		Array.from(getAllByTestId('content')).map((node) => (node as HTMLDivElement).innerHTML)
	).toEqual(['Content for Button']);
});

it('should show content of initialOpen items even if they are not active', () => {
	const components = [
		{
			visibleName: 'Button',
			name: 'Button',
			slug: 'button',
			href: '#button',
			content: <div data-testid="content">Content for Button</div>,
		},
		{
			visibleName: 'Input',
			name: 'Input',
			slug: 'input',
			href: '#input',
			content: <div data-testid="content">Content for Input</div>,
			initialOpen: true,
		},
	];

	const { getAllByTestId, getByText } = render(
		<Provider>
			<ComponentsList items={components} />
		</Provider>
	);

	fireEvent.click(getByText('Button'));

	expect(
		Array.from(getAllByTestId('content')).map((node) => (node as HTMLDivElement).innerHTML)
	).toEqual(['Content for Button', 'Content for Input']);
});

it('should show content of forcedOpen items even if they are initially collapsed', () => {
	const components = [
		{
			visibleName: 'Button',
			name: 'Button',
			slug: 'button',
			href: '#button',
			content: <div data-testid="content">Content for Button</div>,
			initialOpen: true,
		},
		{
			visibleName: 'Input',
			name: 'Input',
			slug: 'input',
			href: '#input',
			content: <div data-testid="content">Content for Input</div>,
			initialOpen: true,
			forcedOpen: true,
		},
	];

	const { getAllByTestId, getByText } = render(
		<Provider>
			<ComponentsList items={components} />
		</Provider>
	);

	fireEvent.click(getByText('Input'));

	expect(
		Array.from(getAllByTestId('content')).map((node) => (node as HTMLDivElement).innerHTML)
	).toEqual(['Content for Button', 'Content for Input']);
});
