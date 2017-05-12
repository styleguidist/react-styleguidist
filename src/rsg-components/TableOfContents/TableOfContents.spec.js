import React from 'react';
import noop from 'lodash/noop';
import TableOfContents from './TableOfContents';
import { TableOfContentsRenderer } from './TableOfContentsRenderer';

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

const sections = [
	{
		name: 'Introduction',
		slug: 'introduction',
		content: 'intro.md',
	},
	{
		name: 'Buttons',
		slug: 'buttons',
		components: [
			{
				name: 'Button',
				slug: 'button',
			},
		],
	},
	{
		name: 'Forms',
		slug: 'forms',
		components: [
			{
				name: 'Input',
				slug: 'input',
			},
			{
				name: 'Textarea',
				slug: 'textarea',
			},
		],
	},
];

it('should render a renderer', () => {
	const actual = shallow(<TableOfContents sections={[{ components }]} />);

	expect(actual).toMatchSnapshot();
});

it('should render renderer with sections with nested components', () => {
	const actual = shallow(<TableOfContents sections={sections} />);

	expect(actual).toMatchSnapshot();
});

it('should filter list when search field contains a query', () => {
	const searchTerm = 'but';
	const actual = shallow(<TableOfContents sections={[{ components }]} />);

	expect(actual).toMatchSnapshot();

	actual.setState({ searchTerm });

	expect(actual).toMatchSnapshot();
});

it('should filter section names', () => {
	const searchTerm = 'frm';
	const actual = shallow(<TableOfContents sections={sections} />);

	expect(actual).toMatchSnapshot();

	actual.setState({ searchTerm });

	expect(actual).toMatchSnapshot();
});

it('renderer should render table of contents', () => {
	const searchTerm = 'foo';
	const actual = shallow(
		<TableOfContentsRenderer
			classes={{}}
			items={<div>foo</div>}
			searchTerm={searchTerm}
			onSearchTermChange={noop}
		/>
	);

	expect(actual).toMatchSnapshot();
});

it('should call a callback when input value changed', () => {
	const onSearchTermChange = jest.fn();
	const searchTerm = 'foo';
	const newSearchTerm = 'bar';
	const actual = shallow(
		<TableOfContentsRenderer
			classes={{}}
			items={<div>foo</div>}
			searchTerm={searchTerm}
			onSearchTermChange={onSearchTermChange}
		/>
	);

	actual.find('input').simulate('change', {
		target: {
			value: newSearchTerm,
		},
	});

	expect(onSearchTermChange).toBeCalledWith(newSearchTerm);
});
