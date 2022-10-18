import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { WelcomeRenderer } from './WelcomeRenderer';

it('renderer should render welcome screen', () => {
	const renderer = createRenderer();
	renderer.render(<WelcomeRenderer classes={{}} patterns={['foo/*.js', 'bar/*.js']} />);

	expect(renderer.getRenderOutput()).toMatchSnapshot();
});
