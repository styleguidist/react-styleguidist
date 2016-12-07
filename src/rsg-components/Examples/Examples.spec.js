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
	const actual = shallow(
		<Examples
			examples={examples}
			name="button"
		/>,
		{
			context: {
				codeKey: 1,
				singleExample: false,
			},
		}
	);

	expect(actual).toMatchSnapshot();
});
