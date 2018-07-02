import React from 'react';
import SectionHeading from './index';
import SectionHeadingRenderer from './SectionHeadingRenderer';

describe('SectionHeading', () => {
	const FakeToolbar = () => <div>Fake toolbar</div>;

	it('should forward slot properties to the toolbar', () => {
		const actual = shallow(
			<SectionHeading id="section" slotName="slot" slotProps={{ foo: 1, bar: 'baz' }} depth={2}>
				A Section
			</SectionHeading>
		);

		expect(actual).toMatchSnapshot();
	});

	it('should render a section heading', () => {
		const actual = shallow(
			<SectionHeadingRenderer id="section" href="/section" depth={2} toolbar={<FakeToolbar />}>
				A Section
			</SectionHeadingRenderer>
		);

		expect(actual.dive()).toMatchSnapshot();
	});

	it('should render a deprecated section heading', () => {
		const actual = shallow(
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

		expect(actual.dive()).toMatchSnapshot();
	});

	it('should prevent the heading level from exceeding the maximum allowed by the Heading component', () => {
		const actual = shallow(
			<SectionHeadingRenderer id="section" href="/section" depth={7} toolbar={<FakeToolbar />}>
				A Section
			</SectionHeadingRenderer>
		);

		expect(
			actual
				.dive()
				.find('Styled(Heading)')
				.prop('level')
		).toEqual(6);
	});
});
