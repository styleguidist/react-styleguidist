import React from 'react';
import renderer from 'react-test-renderer';
import Heading from './index';

describe('Heading', () => {
	it('should render a heading according to the level', () => {
		const actualH3 = renderer.create(<Heading level={3}>The heading</Heading>);
		expect(actualH3.toJSON()).toMatchSnapshot();

		const actualH5 = renderer.create(<Heading level={5}>The heading</Heading>);
		expect(actualH5.toJSON()).toMatchSnapshot();
	});

	it('should render a heading', () => {
		const actual = renderer.create(<Heading level={2}>The heading</Heading>);
		expect(actual.toJSON()).toMatchSnapshot();
	});
});
