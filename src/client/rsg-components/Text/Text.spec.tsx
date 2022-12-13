import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { TextRenderer, styles } from './TextRenderer';

const props = {
	classes: classes(styles),
};

describe('Text', () => {
	it('should render text', () => {
		const renderer = createRenderer();
		renderer.render(<TextRenderer {...props}>Pizza</TextRenderer>);

		expect(renderer.getRenderOutput()).toMatchSnapshot();
	});

	it('should render underlined text', () => {
		const renderer = createRenderer();
		renderer.render(
			<TextRenderer {...props} underlined>
				Pizza
			</TextRenderer>
		);

		expect(renderer.getRenderOutput()).toMatchSnapshot();
	});

	it('should render sized text', () => {
		const renderer = createRenderer();
		renderer.render(
			<TextRenderer {...props} size="small">
				Pizza
			</TextRenderer>
		);

		expect(renderer.getRenderOutput()).toMatchSnapshot();
	});

	it('should render colored text', () => {
		const renderer = createRenderer();
		renderer.render(
			<TextRenderer {...props} color="light">
				Pizza
			</TextRenderer>
		);

		expect(renderer.getRenderOutput()).toMatchSnapshot();
	});

	it('should render text with a semantic tag and styles', () => {
		const renderer = createRenderer();
		renderer.render(
			<TextRenderer {...props} semantic="strong">
				Pizza
			</TextRenderer>
		);

		expect(renderer.getRenderOutput()).toMatchSnapshot();
	});

	it('should render text with a title', () => {
		const renderer = createRenderer();
		renderer.render(
			<TextRenderer {...props} title="Pasta">
				Pizza
			</TextRenderer>
		);

		expect(renderer.getRenderOutput()).toMatchSnapshot();
	});
});
