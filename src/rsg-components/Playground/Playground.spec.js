import test from 'ava';
import React from 'react';
import noop from 'lodash/noop';
import Preview from '../Preview';
import Playground from './Playground';
import PlaygroundRenderer from './PlaygroundRenderer';

const code = '<button>OK</button>';

test('should render component renderer', () => {
	const actual = shallow(
		<Playground
			highlightTheme="base16-light"
			code={code}
			evalInContext={noop}
		/>,
		{
			context: {
				config: {
					showCode: false,
				},
			},
		}
	);

	expect(actual.node, 'to contain',
		<PlaygroundRenderer
			code={code}
			showCode={false}
			highlightTheme="base16-light"
			evalInContext={noop}
		/>
	);
});

test('renderer should render preview', () => {
	const actual = shallow(
		<PlaygroundRenderer
			code={code}
			showCode={false}
			highlightTheme="base16-light"
			evalInContext={noop}
		/>
	);

	expect(actual.node, 'to contain',
		<Preview code={code} />
	);
});
