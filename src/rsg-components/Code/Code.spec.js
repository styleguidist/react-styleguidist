import test from 'ava';
import React from 'react';
import CodeRenderer from './CodeRenderer';

test('renderer should render code', () => {
	const code = '<button>OK</button>';
	const actual = shallow(
		<CodeRenderer>{code}</CodeRenderer>
	);

	expect(actual.node, 'to contain',
		<code>{code}</code>
	);
});
