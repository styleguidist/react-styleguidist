import React from 'react';
import renderer from 'react-test-renderer';
import { createRenderer } from 'react-test-renderer/shallow';
import SectionHeading from './index';
import SectionHeadingRenderer from './SectionHeadingRenderer';

describe('SectionHeading', () => {
	const FakeToolbar = () => <div>Fake toolbar</div>;

	test('should forward slot properties to the toolbar', () => {
		const testRenderer = createRenderer();
		testRenderer.render(
			<SectionHeading
				id="section"
				slotName="slot"
				href="/#section"
				slotProps={{ foo: 1, bar: 'baz' }}
				depth={2}
			>
				A Section
			</SectionHeading>
		);

		expect(testRenderer.getRenderOutput()).toMatchSnapshot();
	});

	test('render a section heading', () => {
		const actual = renderer.create(
			<SectionHeadingRenderer id="section" href="/section" depth={2} toolbar={<FakeToolbar />}>
				A Section
			</SectionHeadingRenderer>
		);

		expect(actual.toJSON()).toMatchSnapshot();
	});

	test('render a deprecated section heading', () => {
		const actual = renderer.create(
			<SectionHeadingRenderer
				id="section"
				href="/section"
				depth={2}
				toolbar={<FakeToolbar />}
				deprecated
			>
				A Section
			</SectionHeadingRenderer>
		);

		expect(actual.toJSON()).toMatchSnapshot();
	});

	test('prevent the heading level from exceeding the maximum allowed by the Heading component', () => {
		const actual = renderer.create(
			<SectionHeadingRenderer id="section" href="/section" depth={7} toolbar={<FakeToolbar />}>
				A Section
			</SectionHeadingRenderer>
		);

		expect(actual.toJSON()).toMatchSnapshot();
	});
});
