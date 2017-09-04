import React from 'react';
import noop from 'lodash/noop';
import Examples from '../Examples';
import Components from '../Components';
import Sections from '../Sections';
import Section from './Section';
import { SectionRenderer } from './SectionRenderer';

const section = {
	name: 'Foo',
	slug: 'foo',
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
	sections: [],
};

it('should render component renderer', () => {
	const actual = shallow(<Section section={section} depth={3} />);

	expect(actual).toMatchSnapshot();
});

it('should render components list', () => {
	const actual = shallow(
		<Section
			section={{
				name: 'Components',
				slug: 'components',
				components: [],
			}}
			depth={3}
		/>
	);

	expect(actual).toMatchSnapshot();
});

it('should not render components list if not defined', () => {
	const actual = shallow(
		<Section
			section={{
				name: 'No components',
				slug: 'no-components',
			}}
			depth={3}
		/>
	);

	expect(actual).toMatchSnapshot();
});

it('should render sections if defined', () => {
	const actual = shallow(
		<Section
			section={{
				name: 'Nested sections',
				slug: 'nested-sections',
				sections: [],
			}}
			depth={3}
		/>
	);

	expect(actual).toMatchSnapshot();
});

it('should not render sections if not defined', () => {
	const actual = shallow(
		<Section
			section={{
				name: 'No sections',
				slug: 'no-sections',
			}}
			depth={3}
		/>
	);

	expect(actual).toMatchSnapshot();
});

it('render should render component', () => {
	const actual = shallow(
		<SectionRenderer
			classes={{}}
			name={section.name}
			slug={section.slug}
			content={<Examples name={section.name} examples={section.content} />}
			components={<Components components={[]} depth={3} />}
			sections={<Sections sections={[]} depth={3} />}
			depth={3}
		/>
	);

	expect(actual).toMatchSnapshot();
});

it('render should not render title if name is not set', () => {
	const actual = shallow(<SectionRenderer classes={{}} depth={3} />);

	expect(actual).toMatchSnapshot();
});

it('render should render title if name is set', () => {
	const actual = shallow(<SectionRenderer classes={{}} name="test" slug="test" depth={3} />);

	expect(actual).toMatchSnapshot();
});
