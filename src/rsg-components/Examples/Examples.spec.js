import React from 'react';
import noop from 'lodash/noop';
import Examples from '../Examples';
import { DisplayModes } from '../../consts';
import { Provider } from '../../provider';

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

it('should render examples', () => {
	const context = {
		codeRevision: 1,
		displayMode: DisplayModes.example,
	};
	const actual = shallow(
		<Provider {...context}>
			<Examples examples={examples} name="button" exampleMode="collapse" />
		</Provider>
	);

	expect(actual).toMatchSnapshot();
});

it('should not render a example with unknown type', () => {
	const faultyExample = [
		{
			type: 'unknown',
			content: 'FooBar',
		},
	];
	const context = {
		codeRevision: 1,
	};

	const actual = mount(
		<Provider {...context}>
			<Examples examples={faultyExample} name="button" exampleMode="collapse" />
		</Provider>
	);
	const article = actual.find('article');
	expect(article.length).toEqual(1);
	expect(article.text().includes('FooBar')).toEqual(false);
});
