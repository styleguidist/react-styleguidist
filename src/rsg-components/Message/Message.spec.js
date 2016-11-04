import test from 'ava';
import React from 'react';
import Markdown from '../Markdown';
import MessageRenderer from './MessageRenderer';

test('renderer should render message', () => {
	const message = 'Hello *world*!';
	const actual = shallow(
		<MessageRenderer>{message}</MessageRenderer>
	);

	expect(actual.node, 'to contain',
		<Markdown text={message} />
	);
});
