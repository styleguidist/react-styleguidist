import React from 'react';
import SectionHeading from './index';
import SectionHeadingRenderer from './SectionHeadingRenderer';

describe('SectionHeading', () => {
	const FakeToolbar = () => <div>Fake toolbar</div>;

	test('should forward slot properties to the toolbar', () => {
		const actual = shallow(
			<SectionHeading id="section" slotName="slot" slotProps={{ foo: 1, bar: 'baz' }} depth={2}>
				A Section
			</SectionHeading>
		);

		expect(actual).toMatchSnapshot();
	});

	test('render a section heading', () => {
		const actual = mount(
			<SectionHeadingRenderer id="section" href="/section" depth={2} toolbar={<FakeToolbar />}>
				A Section
			</SectionHeadingRenderer>
		);

		expect(actual.find('h2')).toMatchSnapshot();
	});

	test('render a deprecated section heading', () => {
		const actual = mount(
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

		expect(actual.find('h2')).toMatchSnapshot();
	});

	test('prevent the heading level from exceeding the maximum allowed by the Heading component', () => {
		const actual = mount(
			<SectionHeadingRenderer id="section" href="/section" depth={7} toolbar={<FakeToolbar />}>
				A Section
			</SectionHeadingRenderer>
		);

		expect(actual.find('h6')).toHaveLength(1);
	});

	test('the href have id=section query parameter ', () => {
		const actual = shallow(
			<SectionHeading
				id="section"
				pagePerSection
				slotName="slot"
				slotProps={{ foo: 1, bar: 'baz' }}
				depth={2}
			>
				A Section
			</SectionHeading>
		);

		expect(actual.prop('href')).toEqual('/?id=section');
	});
});
