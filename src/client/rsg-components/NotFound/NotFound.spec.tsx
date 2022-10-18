import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { NotFoundRenderer } from './NotFoundRenderer';

it('renderer should render not found message', () => {
	const renderer = createRenderer();
	renderer.render(<NotFoundRenderer classes={{}} />);

	expect(renderer.getRenderOutput()).toMatchSnapshot();
});
