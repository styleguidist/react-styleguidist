import React from 'react';
import { shallow } from 'enzyme';
import { ErrorRenderer } from './ErrorRenderer';

it('renderer should render error message', () => {
	const error = { toString: () => 'error' };
	const info = { componentStack: 'info' };
	const actual = shallow(<ErrorRenderer classes={{}} error={error} info={info} />);

	expect(actual).toMatchSnapshot();
});
