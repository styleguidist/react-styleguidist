import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { ErrorRenderer } from './ErrorRenderer';

it('renderer should render error message', () => {
	const error = { toString: () => 'error' };
	const info = { componentStack: 'info' };
	const renderer = createRenderer();
	renderer.render(<ErrorRenderer classes={{}} error={error} info={info} />);

	expect(renderer.getRenderOutput()).toMatchSnapshot();
});
