import React from 'react';
import noop from 'lodash/noop';
import Playground from './Playground';
import { PlaygroundRenderer } from './PlaygroundRenderer';

const code = '<button>OK</button>';

it('should render component renderer', () => {
	const actual = shallow(
		<Playground
			code={code}
			evalInContext={noop}
			name="name"
			index={0}
		/>,
		{
			context: {
				config: {
					showCode: false,
				},
			},
		}
	);

	expect(shallowToJson(actual)).toMatchSnapshot();
});

it('renderer should render preview', () => {
	const actual = shallow(
		<PlaygroundRenderer
			classes={{}}
			code={code}
			showCode={false}
			evalInContext={noop}
			name="name"
			index={0}
			onChange={noop}
			onCodeToggle={noop}
		/>
	);

	expect(shallowToJson(actual)).toMatchSnapshot();
});
