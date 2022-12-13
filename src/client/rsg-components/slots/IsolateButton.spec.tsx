import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import IsolateButton from './IsolateButton';

it('should renderer a link to isolated mode', () => {
	const renderer = createRenderer();
	renderer.render(<IsolateButton name="Pizza" href="/#pizza" />);

	expect(renderer.getRenderOutput()).toMatchSnapshot();
});

it('should renderer a link to example isolated mode', () => {
	const renderer = createRenderer();
	renderer.render(<IsolateButton name="Pizza" href="/#pizza" example={3} />);

	expect(renderer.getRenderOutput()).toMatchSnapshot();
});

it('should renderer a link home in isolated mode', () => {
	const renderer = createRenderer();
	renderer.render(<IsolateButton name="Pizza" href="/#pizza" isolated />);

	expect(renderer.getRenderOutput()).toMatchSnapshot();
});
