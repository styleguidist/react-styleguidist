import test from 'ava';
import React from 'react';
import noop from 'lodash/noop';
import Examples from '../Examples';
import Components from '../Components';
import Section from './Section';
import SectionRenderer from './SectionRenderer';

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

test('should render component renderer', () => {
	const actual = shallow(
		<Section
			section={section}
		/>
	);

	expect(actual.node, 'to contain',
		<SectionRenderer
			name={section.name}
			content={<Examples examples={section.content} />}
			components={<Components components={[]} sections={[]} />}
		/>
	);
});

test('render should render component', () => {
	const actual = shallow(
		<SectionRenderer
			name={section.name}
			content={<Examples examples={section.content} />}
			components={<Components components={[]} sections={[]} />}
		/>
	);

	expect(actual.node, 'to contain',
		<h1>{section.name}</h1>
	);
	expect(actual.node, 'to contain',
		<Examples examples={section.content} />
	);
	expect(actual.node, 'to contain',
		<Components components={[]} sections={[]} />
	);
});
