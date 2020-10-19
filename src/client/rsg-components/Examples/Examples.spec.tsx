import React from 'react';
import { render } from '@testing-library/react';
import Examples from '.';
import Context from '../Context';
import slots from '../slots';
import { DisplayModes } from '../../consts';
import * as Rsg from '../../../typings';

const evalInContext = (a: string): (() => any) =>
	// eslint-disable-next-line no-new-func
	new Function('require', 'const React = require("react");' + a).bind(null, require);

const examples: Rsg.Example[] = [
	{
		type: 'code',
		content: '<button>Code: OK</button>',
		evalInContext,
	},
	{
		type: 'markdown',
		content: 'Markdown: Hello *world*!',
	},
];

const context = {
	config: {
		previewDelay: 0,
	},
	codeRevision: 1,
	displayMode: DisplayModes.example,
	slots: slots(),
};

const Provider = (props: any) => <Context.Provider value={context} {...props} />;

test('should render examples', () => {
	const { getByText } = render(
		<Provider>
			<Examples examples={examples} name="button" exampleMode="collapse" />
		</Provider>
	);
	expect(getByText(/code: ok/i)).toBeInTheDocument();
	expect(getByText(/markdown: hello/i)).toBeInTheDocument();
});

test('should not render an example with unknown type', () => {
	const faultyExample = [
		{
			type: 'unknown',
			content: 'FooBar',
		} as any,
	];
	const { getByTestId } = render(
		<Provider>
			<Examples examples={faultyExample} name="button" exampleMode="collapse" />
		</Provider>
	);
	expect(getByTestId('button-examples')).toBeEmptyDOMElement();
});
