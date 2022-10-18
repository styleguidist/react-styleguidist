import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import noop from 'lodash/noop';
import Section from '../Section';
import Sections from './Sections';
import StyledSectionsRenderer, { SectionsRenderer } from './SectionsRenderer';

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
	{
		sections: [
			{
				name: 'One',
				content: [],
			},
			{
				name: 'Two',
				content: [],
			},
		],
	},
] as any;

it('should render component renderer', () => {
	const renderer = createRenderer();
	renderer.render(<Sections sections={sections} depth={3} />);

	expect(renderer.getRenderOutput()).toMatchSnapshot();
});

it('render should render styled component', () => {
	const renderer = createRenderer();
	renderer.render(
		<StyledSectionsRenderer>
			<Section key={0} section={sections[0]} depth={3} />
			<Section key={1} section={sections[1]} depth={3} />
			<Section key={2} section={sections[2]} depth={3} />
		</StyledSectionsRenderer>
	);

	expect(renderer.getRenderOutput()).toMatchSnapshot();
});

it('render should render component', () => {
	const renderer = createRenderer();
	renderer.render(
		<SectionsRenderer classes={{}}>
			<Section key={0} section={sections[0]} depth={3} />
			<Section key={1} section={sections[1]} depth={3} />
			<Section key={2} section={sections[2]} depth={3} />
		</SectionsRenderer>
	);

	expect(renderer.getRenderOutput()).toMatchSnapshot();
});
