import test from 'ava';
import React from 'react';
import PlaygroundErrorRenderer from './PlaygroundErrorRenderer';

test('renderer should render message', () => {
	const message = 'Hello *world*!';
	const actual = shallow(
		<PlaygroundErrorRenderer message={message} />
	);

	expect(actual.node, 'to contain',
		<pre>{message}</pre>
	);
});
