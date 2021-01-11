/* eslint-disable @typescript-eslint/naming-convention */

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { shallow } from 'enzyme';
import TableOfContents from './TableOfContents';
import { TableOfContentsRenderer } from './TableOfContentsRenderer';
import Context from '../Context';
import * as Rsg from '../../../typings';

const module: Rsg.ExamplesModule = {
	default: () => null,
	__esModule: true,
	__documentScope: {},
	__exampleScope: {},
	__currentComponent: () => null,
	__examples: [],
};

const components = [
	{
		visibleName: 'Button',
		name: 'Button',
		href: '#button',
		slug: 'button',
	},
	{
		visibleName: 'Input',
		name: 'Input',
		href: '#input',
		slug: 'input',
	},
	{
		visibleName: 'Textarea',
		name: 'Textarea',
		href: '#textarea',
		slug: 'textarea',
	},
];

const sections: Rsg.Section[] = [
	{
		visibleName: 'Introduction',
		name: 'Introduction',
		href: '#introduction',
		slug: 'introduction',
		content: module,
	},
	{
		visibleName: 'Buttons',
		name: 'Buttons',
		href: '#buttons',
		slug: 'buttons',
		components: [
			{
				visibleName: 'Button',
				name: 'Button',
				href: '#button',
				slug: 'button',
			},
		],
	},
	{
		visibleName: 'Forms',
		name: 'Forms',
		href: '#forms',
		slug: 'forms',
		components: [
			{
				visibleName: 'Input',
				name: 'Input',
				href: '#input',
				slug: 'input',
			},
			{
				visibleName: 'Textarea',
				name: 'Textarea',
				href: '#textarea',
				slug: 'textarea',
			},
		],
	},
];

it('should filter list when search field contains a query', () => {
	const searchTerm = 'put';
	const { getByPlaceholderText, getAllByTestId, getByTestId } = render(
		<TableOfContents
			sections={[
				{
					visibleName: 'Input',
					href: '#input',
					components,
				},
			]}
			tocMode="expand"
		/>
	);
	expect(getAllByTestId('rsg-toc-link').length).toBe(3);
	fireEvent.change(getByPlaceholderText('Filter by name'), { target: { value: searchTerm } });
	expect(getAllByTestId('rsg-toc-link')).toHaveLength(1);
	expect(getByTestId('rsg-toc-link')).toHaveTextContent('Input');
});

it('should filter section names', () => {
	const searchTerm = 'frm';
	const { getByPlaceholderText, getAllByTestId, getByTestId } = render(
		<TableOfContents sections={sections} />
	);
	expect(getAllByTestId('rsg-toc-link').length).toBe(6);
	fireEvent.change(getByPlaceholderText('Filter by name'), { target: { value: searchTerm } });
	expect(getAllByTestId('rsg-toc-link')).toHaveLength(1);
	expect(getByTestId('rsg-toc-link')).toHaveTextContent('Forms');
});

it('should call a callback when input value changed', () => {
	const onSearchTermChange = jest.fn();
	const searchTerm = 'foo';
	const newSearchTerm = 'bar';
	const actual = shallow(
		<TableOfContentsRenderer
			classes={{}}
			searchTerm={searchTerm}
			onSearchTermChange={onSearchTermChange}
		>
			<div>foo</div>
		</TableOfContentsRenderer>
	);

	actual.find('input').simulate('change', {
		target: {
			value: newSearchTerm,
		},
	});

	expect(onSearchTermChange).toBeCalledWith(newSearchTerm);
});

it('should render components with useRouterLinks', () => {
	const { getAllByRole } = render(
		<TableOfContents
			useRouterLinks
			sections={[
				{
					sections: [
						{
							visibleName: '1',
							name: 'Components',
							href: '#/Components',
							slug: 'components',
							content: module,
						},
						{
							visibleName: '2',
							content: module,
							href: '#/Chap',
							slug: 'chap',
						},
					],
				},
			]}
		/>
	);

	expect((getAllByRole('link')[0] as any).href).toMatch(/\/#\/Components$/);
});

/**
 * testing this layer with no mocking makes no sense...
 * This test should not exist but for good coverage policy this is necessary
 */
it('should detect sections containing current selection when tocMode is collapse', () => {
	const context = {
		config: {
			tocMode: 'collapse',
		},
	};

	const Provider = (props: any) => <Context.Provider value={context} {...props} />;

	const { getByText } = render(
		<Provider>
			<TableOfContents
				tocMode="collapse"
				sections={[
					{
						sections: [
							{
								visibleName: '1',
								href: '#/components',
								slug: 'components',
								sections: [{ visibleName: '1.1', href: '#/button', slug: 'button' }],
							},
							{
								visibleName: '2',
								href: '#/chap',
								slug: 'chap',
								content: module,
								sections: [{ visibleName: '2.1', href: '#/chapter-1', slug: 'chapter-1' }],
							},
							{
								visibleName: '3',
								href: 'http://react-styleguidist.com',
								slug: 'react-styleguidist',
							},
						],
					},
				]}
				loc={{ pathname: '', hash: 'button' }}
			/>
		</Provider>
	);

	expect(getByText('1.1')).not.toBeEmptyDOMElement();
});

it('should show sections with expand: true when tocMode is collapse', () => {
	const { getByText } = render(
		<TableOfContents
			tocMode="collapse"
			sections={[
				{
					sections: [
						{
							visibleName: '1',
							expand: true,
							href: '#/components',
							slug: 'components',
							sections: [{ visibleName: '1.1', href: '#/button', slug: 'button' }],
						},
						{
							visibleName: '2',
							href: '#/chap',
							slug: 'chap',
							content: module,
							sections: [{ visibleName: '2.1', href: '#/chapter-1', slug: 'chapter-1' }],
						},
						{
							visibleName: '3',
							href: 'http://react-styleguidist.com',
							slug: 'react-styleguidist',
						},
					],
				},
			]}
		/>
	);
	expect(getByText('1.1')).toBeVisible();
});
