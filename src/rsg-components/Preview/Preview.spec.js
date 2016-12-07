import React from 'react';
import noop from 'lodash/noop';
import Preview from '../Preview';

const code = '<button>OK</button>';

it('should render component renderer', () => {
	const actual = shallow(
		<Preview
			code={code}
			evalInContext={noop}
		/>
	);

	expect(actual).toMatchSnapshot();
});
