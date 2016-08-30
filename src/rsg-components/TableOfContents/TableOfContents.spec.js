import test from 'ava';
import React from 'react';
import TableOfContents from './TableOfContents';

const COMPONENTS = [
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

const SECTIONS = [
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

test('should render a list with each component', t => {
	const actual = shallow(
		<TableOfContents components={COMPONENTS} sections={[]} />
	);

	const items = actual.find('.Test__link');
	t.is(items.length, COMPONENTS.length);
});

test('should render sections with nested components', () => {
	const actual = shallow(
		<TableOfContents components={[]} sections={SECTIONS} />
	);

	expect(actual.node, 'to contain',
		<ul>
			<li>Introduction</li>
			<li>Buttons
				<ul>
					<li>Button</li>
				</ul>
			</li>
			<li>Forms
				<ul>
					<li>Input</li>
					<li>Textarea</li>
				</ul>
			</li>
		</ul>
	);
});

test('should render a filtered list when search field contains a query', t => {
	const actual = shallow(
		<TableOfContents components={COMPONENTS} sections={[]} />
	);

	const input = actual.find('.Test__search');
	input.simulate('change', { target: { value: 'but' } });

	const items = actual.find('.Test__link');
	t.is(items.length, 1);
});

test('should render a filtered list, should hide empty sections', t => {
	const actual = shallow(
		<TableOfContents components={[]} sections={SECTIONS} />
	);

	const input = actual.find('.Test__search');
	input.simulate('change', { target: { value: 'inp' } });

	const sections = actual.find('.Test__section');
	t.is(sections.length, 1);
	const items = actual.find('.Test__link');
	t.is(items.length, 2);
});
