import React from 'react';
import { ErrorRenderer } from './ErrorRenderer';

it('renderer should render error message', () => {
	const error = { toString: () => 'error' };
	const info = { componentStack: { toString: () => 'info' } };
	const actual = shallow(<ErrorRenderer classes={{}} error={error} info={info} />);

	expect(actual).toMatchSnapshot();
});
