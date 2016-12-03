import React from 'react';
import noop from 'lodash/noop';
import Examples from '../Examples';
import Components from '../Components';
import Section from './Section';
import { SectionRenderer } from './SectionRenderer';

const section = {
	name: 'Foo',
	content: [
		{
			type: 'code',
			content: '<button>OK</button>',
			evalInContext: noop,
		},
		{
			type: 'markdown',
			content: 'Hello *world*!',
		},
	],
	components: [],
};

it('should render component renderer', () => {
	const actual = shallow(
		<Section
			section={section}
		/>
	);

	expect(shallowToJson(actual)).toMatchSnapshot();
});

it('render should render component', () => {
	const actual = shallow(
		<SectionRenderer
			classes={{}}
			name={section.name}
			content={<Examples examples={section.content} />}
			components={<Components components={[]} sections={[]} />}
		/>
	);

	expect(shallowToJson(actual)).toMatchSnapshot();
});
