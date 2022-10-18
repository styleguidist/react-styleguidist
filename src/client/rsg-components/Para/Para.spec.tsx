import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { ParaRenderer, styles } from './ParaRenderer';

const props = {
	classes: classes(styles),
};

it('should render paragraph as a <div>', () => {
	const renderer = createRenderer();
	renderer.render(<ParaRenderer {...props}>Pizza</ParaRenderer>);

	expect(renderer.getRenderOutput()).toMatchSnapshot();
});

it('should render paragraph as a <p>', () => {
	const renderer = createRenderer();
	renderer.render(
		<ParaRenderer {...props} semantic="p">
			Pizza
		</ParaRenderer>
	);

	expect(renderer.getRenderOutput()).toMatchSnapshot();
});
