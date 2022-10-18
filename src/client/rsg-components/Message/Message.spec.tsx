import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { MessageRenderer } from './MessageRenderer';

it('renderer should render message', () => {
	const message = 'Hello *world*!';
	const renderer = createRenderer();
	renderer.render(<MessageRenderer classes={{}}>{message}</MessageRenderer>);

	expect(renderer.getRenderOutput()).toMatchSnapshot();
});

it('renderer should render message for array', () => {
	const messages = ['Hello *world*!', 'Foo _bar_'];
	const renderer = createRenderer();
	renderer.render(<MessageRenderer classes={{}}>{messages}</MessageRenderer>);

	expect(renderer.getRenderOutput()).toMatchSnapshot();
});
