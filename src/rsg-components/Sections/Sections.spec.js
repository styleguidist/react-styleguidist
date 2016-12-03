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

it('should render component renderer', () => {
	const actual = shallow(
		<Sections sections={sections} />
	);

	expect(shallowToJson(actual)).toMatchSnapshot();
});

it('render should render component', () => {
	const actual = shallow(
		<SectionsRenderer
			sections={[
				<Section key={1} section={sections[0]} />,
				<Section key={2} section={sections[1]} />,
			]}
		/>
	);

	expect(shallowToJson(actual)).toMatchSnapshot();
});
