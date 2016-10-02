import test from 'ava';
import React from 'react';
import noop from 'lodash/noop';
import Section from '../Section';
import Sections from './Sections';
import SectionsRenderer from './SectionsRenderer';

const sections = [
	{
		name: 'Foo',
		content: [
			{
				type: 'code',
				content: '<button>OK</button>',
				evalInContext: noop,
			},
		],
		components: [],
	},
	{
		name: 'Bar',
		content: [
			{
				type: 'markdown',
				content: 'Hello *world*!',
			},
		],
		components: [],
	},
];

test('should render component renderer', () => {
	const actual = shallow(
		<Sections sections={sections} />
	);

	expect(actual.node, 'to contain',
		<SectionsRenderer
			sections={[
				<Section section={sections[0]} />,
				<Section section={sections[1]} />,
			]}
		/>
	);
});

test('render should render component', () => {
	const actual = shallow(
		<SectionsRenderer
			sections={[
				<Section section={sections[0]} />,
				<Section section={sections[1]} />,
			]}
		/>
	);

	expect(actual.node, 'to contain',
		<Section section={sections[0]} />
	);
	expect(actual.node, 'to contain',
		<Section section={sections[1]} />
	);
});
