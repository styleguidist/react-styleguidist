import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { PlaygroundErrorRenderer } from './PlaygroundErrorRenderer';

it('renderer should render message', () => {
	const message = 'Hello *world*!';
	const renderer = createRenderer();
	renderer.render(<PlaygroundErrorRenderer classes={{}} message={message} />);

	expect(renderer.getRenderOutput()).toMatchSnapshot();
});
