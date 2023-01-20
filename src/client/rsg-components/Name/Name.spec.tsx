import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { NameRenderer, styles } from './NameRenderer';

const props = {
	classes: classes(styles),
};

it('renderer should render argument name', () => {
	const renderer = createRenderer();
	renderer.render(<NameRenderer {...props}>Foo</NameRenderer>);

	expect(renderer.getRenderOutput()).toMatchSnapshot();
});

it('renderer should render deprecated argument name', () => {
	const renderer = createRenderer();
	renderer.render(
		<NameRenderer {...props} deprecated>
			Foo
		</NameRenderer>
	);

	expect(renderer.getRenderOutput()).toMatchSnapshot();
});
