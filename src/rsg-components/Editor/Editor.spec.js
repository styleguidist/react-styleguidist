import test from 'ava';
import React from 'react';
import { EditorLoaderRenderer } from './EditorLoaderRenderer';

// We do not test Editor component because it requires Codemirror that do not work in Node environment.

test('renderer should render loader', () => {
	const actual = shallow(
		<EditorLoaderRenderer classes={{}} />
	);

	expect(actual.node, 'to contain',
		<div>Loading…</div>
	);
});
