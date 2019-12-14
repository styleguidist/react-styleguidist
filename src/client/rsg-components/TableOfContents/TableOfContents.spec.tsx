import React from 'react';
import { shallow } from 'enzyme';
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
	const actual = shallow(
		<TableOfContents
			sections={[
				{
					name: 'Input',
					slug: 'input',
					components,
				},
			]}
		/>
	);

	expect(actual).toMatchSnapshot();
});

it('should render renderer with sections with nested components', () => {
	const actual = shallow(<TableOfContents sections={sections} />);

	expect(actual).toMatchSnapshot();
});

it('should filter list when search field contains a query', () => {
	const searchTerm = 'but';
	const actual = shallow(
		<TableOfContents
			sections={[
				{
					name: 'Input',
					slug: 'input',
					components,
				},
			]}
		/>
	);

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
		<TableOfContentsRenderer classes={{}} searchTerm={searchTerm} onSearchTermChange={noop}>
			<div>foo</div>
		</TableOfContentsRenderer>
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

it('should render content of subsections of a section that has no components', () => {
	const actual = shallow(
		<TableOfContents
			sections={[{ sections: [{ content: 'intro.md' }, { content: 'chapter.md' }] }]}
		/>
	);

	expect(actual.find('ComponentsList').prop('items')).toMatchInlineSnapshot(`
		Array [
		  Object {
		    "components": Array [],
		    "content": undefined,
		    "heading": false,
		    "open": true,
		    "sections": Array [],
		  },
		  Object {
		    "components": Array [],
		    "content": undefined,
		    "heading": false,
		    "open": true,
		    "sections": Array [],
		  },
		]
	`);
});

it('should render components of a single top section as root', () => {
	const actual = shallow(<TableOfContents sections={[{ components }]} />);

	expect(actual.find('ComponentsList').prop('items')).toMatchInlineSnapshot(`
		Array [
		  Object {
		    "components": Array [],
		    "content": undefined,
		    "heading": false,
		    "name": "Button",
		    "open": true,
		    "sections": Array [],
		    "slug": "button",
		  },
		  Object {
		    "components": Array [],
		    "content": undefined,
		    "heading": false,
		    "name": "Input",
		    "open": true,
		    "sections": Array [],
		    "slug": "input",
		  },
		  Object {
		    "components": Array [],
		    "content": undefined,
		    "heading": false,
		    "name": "Textarea",
		    "open": true,
		    "sections": Array [],
		    "slug": "textarea",
		  },
		]
	`);
});

it('should render components with useRouterLinks', () => {
	const actual = shallow(
		<TableOfContents
			useRouterLinks
			sections={[{ sections: [{ content: 'intro.md' }, { content: 'chapter.md' }] }]}
		/>
	);

	expect(actual.find('ComponentsList').prop('items')).toMatchInlineSnapshot(`
		Array [
		  Object {
		    "components": Array [],
		    "content": undefined,
		    "heading": false,
		    "open": true,
		    "sections": Array [],
		  },
		  Object {
		    "components": Array [],
		    "content": undefined,
		    "heading": false,
		    "open": true,
		    "sections": Array [],
		  },
		]
	`);
});

it('should detect sections containing current selection when collapsibleSections', () => {
	window.history.pushState({}, 'Collapse', 'http://localhost/#Button');

	const actual = shallow(
		<TableOfContents
			collapsibleSections
			sections={[
				{
					sections: [
						{ slug: 'Components', sections: [{ slug: 'Button' }] },
						{ slug: 'chap', content: 'chapter.md' },
						{ href: 'http://react-styleguidist.com' },
					],
				},
			]}
		/>
	);

	const items: Rsg.TOCItem[] = actual.find('ComponentsList').prop('items');
	const componentsItem = items.filter(a => a.slug === 'Components')[0];
	expect(componentsItem.open).toBeTruthy();
});
