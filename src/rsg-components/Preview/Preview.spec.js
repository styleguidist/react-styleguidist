import React from 'react';
import noop from 'lodash/noop';
import Preview from '../Preview';

const code = '<button>OK</button>';
const options = {
	context: {
		config: {
			compilerConfig: {},
		},
	},
};

it('should render component renderer', () => {
	const actual = shallow(<Preview code={code} evalInContext={noop} />, options);

	expect(actual).toMatchSnapshot();
});
