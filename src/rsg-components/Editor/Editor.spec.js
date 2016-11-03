import test from 'ava';
import React from 'react';
import EditorRenderer from './EditorRenderer';

// We do not test Editor component because it requires Codemirror that do not work in Node environment.

test('renderer should render editor', () => {
	const editor = <div>editor</div>;
	const actual = shallow(
		<EditorRenderer>{editor}</EditorRenderer>
	);

	expect(actual.node, 'to contain',
		<div>{editor}</div>
	);
});
