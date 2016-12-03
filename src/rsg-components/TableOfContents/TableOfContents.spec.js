import React from 'react';
import TableOfContents from './TableOfContents';

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

const sections = [
	{
		name: 'Introduction',
		content: 'intro.md',
	},
	{
		name: 'Buttons',
		components: [
			{
				name: 'Button',
			},
		],
	},
	{
		name: 'Forms',
		components: [
			{
				name: 'Input',
			},
			{
				name: 'Textarea',
			},
		],
	},
];

it('should render a renderer', () => {
	const actual = shallow(
		<TableOfContents components={components} sections={[]} />
	);

	expect(shallowToJson(actual)).toMatchSnapshot();
});

it('should render renderer with sections with nested components', () => {
	const actual = shallow(
		<TableOfContents components={[]} sections={sections} />
	);

	expect(shallowToJson(actual)).toMatchSnapshot();
});


it('should filter list when search field contains a query', () => {
	const searchTerm = 'but';
	const actual = shallow(
		<TableOfContents components={components} sections={[]} />
	);

	expect(shallowToJson(actual)).toMatchSnapshot();

	actual.setState({ searchTerm });

	expect(shallowToJson(actual)).toMatchSnapshot();
});

it('should render a filtered list, should hide empty sections', () => {
	const searchTerm = 'inp';
	const actual = shallow(
		<TableOfContents components={[]} sections={sections} />
	);

	expect(shallowToJson(actual)).toMatchSnapshot();

	actual.setState({ searchTerm });

	expect(shallowToJson(actual)).toMatchSnapshot();
});

it('should filter section names', () => {
	const searchTerm = 'frm';
	const actual = shallow(
		<TableOfContents components={[]} sections={sections} />
	);

	expect(shallowToJson(actual)).toMatchSnapshot();

	actual.setState({ searchTerm });

	expect(shallowToJson(actual)).toMatchSnapshot();
});
