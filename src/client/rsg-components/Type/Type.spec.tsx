import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { TypeRenderer, styles } from './TypeRenderer';

const props = {
	classes: classes(styles),
};

it('renderer should render type', () => {
	const renderer = createRenderer();
	renderer.render(<TypeRenderer {...props}>Array</TypeRenderer>);

	expect(renderer.getRenderOutput()).toMatchSnapshot();
});
