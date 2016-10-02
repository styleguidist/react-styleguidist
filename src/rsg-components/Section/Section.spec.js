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
			highlightTheme="base16-light"
			section={section}
		/>
	);

	expect(actual.node, 'to contain',
		<SectionRenderer
			name={section.name}
			content={<Examples highlightTheme="base16-light" examples={section.content} />}
			components={<Components highlightTheme="base16-light" components={[]} sections={[]} />}
		/>
	);
});

test('render should render component', () => {
	const actual = shallow(
		<SectionRenderer
			name={section.name}
			content={<Examples highlightTheme="base16-light" examples={section.content} />}
			components={<Components highlightTheme="base16-light" components={[]} sections={[]} />}
		/>
	);

	expect(actual.node, 'to contain',
		<h1>{section.name}</h1>
	);
	expect(actual.node, 'to contain',
		<Examples highlightTheme="base16-light" examples={section.content} />
	);
	expect(actual.node, 'to contain',
		<Components highlightTheme="base16-light" components={[]} sections={[]} />
	);
});
