import React from 'react';
import noop from 'lodash/noop';
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

it('should render examples', () => {
	const actual = shallow(<Examples examples={examples} name="button" />, {
		context: {
			codeRevision: 1,
			isolatedExample: false,
		},
	});

	expect(actual).toMatchSnapshot();
});

it('should not render a example with unknown type', () => {
	const faultyExample = [
		{
			type: 'unknown',
			content: 'FooBar',
		},
	];

	const actual = mount(<Examples examples={faultyExample} name="button" />, {
		context: {
			codeRevision: 1,
		},
	});
	const article = actual.find('article');
	expect(article.length).toEqual(1);
	expect(article.text().includes('FooBar')).toEqual(false);
});
