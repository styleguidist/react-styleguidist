import test from 'ava';
import React from 'react';
import noop from 'lodash/noop';
import Markdown from '../Markdown';
import Playground from '../Playground';
import Examples from '../Examples';

const examples = [
	{
		type: 'code',
		content: '<button>OK</button>',
		evalInContext: noop,
	},
	{
		type: 'markdown',
		content: 'Hello *world*!',
	},
];

test('should render examples', () => {
	const actual = shallow(
		<Examples
			examples={examples}
		/>,
		{
			context: {
				codeKey: 1,
			},
		}
	);

	expect(actual.node, 'to contain',
		<Playground
			code={examples[0].content}
			evalInContext={examples[0].evalInContext}
		/>
	);
	expect(actual.node, 'to contain',
		<Markdown
			text={examples[1].content}
		/>
	);
});
