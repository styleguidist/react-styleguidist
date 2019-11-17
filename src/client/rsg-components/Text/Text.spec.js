import React from 'react';
import { TextRenderer, styles } from './TextRenderer';

const props = {
	classes: classes(styles),
};

describe('Text', () => {
	it('should render text', () => {
		const actual = shallow(<TextRenderer {...props}>Pizza</TextRenderer>);

		expect(actual).toMatchSnapshot();
	});

	it('should render underlined text', () => {
		const actual = shallow(
			<TextRenderer {...props} underlined>
				Pizza
			</TextRenderer>
		);

		expect(actual).toMatchSnapshot();
	});

	it('should render sized text', () => {
		const actual = shallow(
			<TextRenderer {...props} size="small">
				Pizza
			</TextRenderer>
		);

		expect(actual).toMatchSnapshot();
	});

	it('should render colored text', () => {
		const actual = shallow(
			<TextRenderer {...props} color="light">
				Pizza
			</TextRenderer>
		);

		expect(actual).toMatchSnapshot();
	});

	it('should render text with a semantic tag and styles', () => {
		const actual = shallow(
			<TextRenderer {...props} semantic="strong">
				Pizza
			</TextRenderer>
		);

		expect(actual).toMatchSnapshot();
	});

	it('should render text with a title', () => {
		const actual = shallow(
			<TextRenderer {...props} title="Pasta">
				Pizza
			</TextRenderer>
		);

		expect(actual).toMatchSnapshot();
	});
});
