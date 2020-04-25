import React from 'react';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import noop from 'lodash/noop';
import TableOfContents from './TableOfContents';
import { TableOfContentsRenderer } from './TableOfContentsRenderer';
import Context from '../Context';

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
		    "forcedOpen": false,
		    "heading": false,
		    "initialOpen": true,
		    "sections": Array [],
		    "selected": false,
		    "shouldOpenInNewTab": false,
		  },
		  Object {
		    "components": Array [],
		    "content": undefined,
		    "forcedOpen": false,
		    "heading": false,
		    "initialOpen": true,
		    "sections": Array [],
		    "selected": false,
		    "shouldOpenInNewTab": false,
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
		    "forcedOpen": false,
		    "heading": false,
		    "initialOpen": true,
		    "name": "Button",
		    "sections": Array [],
		    "selected": false,
		    "shouldOpenInNewTab": false,
		    "slug": "button",
		  },
		  Object {
		    "components": Array [],
		    "content": undefined,
		    "forcedOpen": false,
		    "heading": false,
		    "initialOpen": true,
		    "name": "Input",
		    "sections": Array [],
		    "selected": false,
		    "shouldOpenInNewTab": false,
		    "slug": "input",
		  },
		  Object {
		    "components": Array [],
		    "content": undefined,
		    "forcedOpen": false,
		    "heading": false,
		    "initialOpen": true,
		    "name": "Textarea",
		    "sections": Array [],
		    "selected": false,
		    "shouldOpenInNewTab": false,
		    "slug": "textarea",
		  },
		]
	`);
});

it('should render as the link will open in a new window only if external presents as true', () => {
	const actual = shallow(
		<TableOfContents
			sections={[
				{
					sections: [
						{ content: 'intro.md', href: 'http://example.com' },
						{ content: 'chapter.md', href: 'http://example.com', external: true },
					],
				},
			]}
		/>
	);

	expect(actual.find('ComponentsList').prop('items')).toMatchInlineSnapshot(`
		Array [
		  Object {
		    "components": Array [],
		    "content": undefined,
		    "forcedOpen": false,
		    "heading": false,
		    "href": "http://example.com",
		    "initialOpen": true,
		    "sections": Array [],
		    "selected": false,
		    "shouldOpenInNewTab": false,
		  },
		  Object {
		    "components": Array [],
		    "content": undefined,
		    "external": true,
		    "forcedOpen": false,
		    "heading": false,
		    "href": "http://example.com",
		    "initialOpen": true,
		    "sections": Array [],
		    "selected": false,
		    "shouldOpenInNewTab": true,
		  },
		]
	`);
});

/**
 * testing this layer with no mocking makes no sense...
 */
it('should render components with useRouterLinks', () => {
	const { getAllByRole } = render(
		<TableOfContents
			useRouterLinks
			sections={[
				{
					sections: [
						{ visibleName: '1', name: 'Components', slug: 'Components', content: 'intro.md' },
						{ visibleName: '2', content: 'chapter.md', slug: 'chap' },
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
								slug: 'Components',
								sections: [{ visibleName: '1.1', slug: 'Button' }],
							},
							{
								visibleName: '2',
								slug: 'chap',
								content: 'chapter.md',
								sections: [{ visibleName: '2.1', slug: 'Chapter #1' }],
							},
							{ visibleName: '3', href: 'http://react-styleguidist.com' },
						],
					},
				]}
				loc={{ pathname: '', hash: '/#Button' }}
			/>
		</Provider>
	);

	expect(getByText('1.1')).not.toBeEmpty();
});
