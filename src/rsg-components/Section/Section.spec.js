import React from 'react';
import noop from 'lodash/noop';
import Examples from '../Examples';
import Components from '../Components';
import Sections from '../Sections';
import Section from './Section';
import { SectionRenderer } from './SectionRenderer';
import { DisplayModes } from '../../consts';

const options = {
	context: {
		displayMode: DisplayModes.all,
	},
};

const section = {
	name: 'Foo',
	slug: 'foo',
	description: 'This is a description',
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

it('should render section renderer', () => {
	const actual = shallow(<Section section={section} depth={3} />, options);

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
		/>,
		options
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
		/>,
		options
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
		/>,
		options
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
		/>,
		options
	);

	expect(actual).toMatchSnapshot();
});

test('should not render section in isolation mode by default', () => {
	const actual = shallow(
		<Section
			section={{
				name: 'A',
				slug: 'a',
			}}
			depth={3}
		/>,
		options
	);

	expect(actual.prop('isolated')).toBeFalsy();
});

test('should render section in isolation mode', () => {
	const actual = shallow(
		<Section
			section={{
				name: 'A',
				slug: 'a',
			}}
			depth={3}
		/>,
		{
			context: {
				...options.context,
				displayMode: DisplayModes.section,
			},
		}
	);

	expect(actual.prop('isolated')).toBeTruthy();
});

it('render should render section', () => {
	const actual = shallow(
		<SectionRenderer
			classes={{}}
			name={section.name}
			slug={section.slug}
			content={<Examples name={section.name} examples={section.content} />}
			components={<Components components={[]} depth={3} />}
			sections={<Sections sections={[]} depth={3} />}
			depth={3}
		/>,
		options
	);

	expect(actual).toMatchSnapshot();
});

it('render should not render title if name is not set', () => {
	const actual = shallow(<SectionRenderer classes={{}} depth={3} />, options);

	expect(actual).toMatchSnapshot();
});

it('render should render title if name is set', () => {
	const actual = shallow(
		<SectionRenderer classes={{}} name="test" slug="test" depth={3} />,
		options
	);

	expect(actual).toMatchSnapshot();
});
