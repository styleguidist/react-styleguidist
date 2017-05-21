import React from 'react';
import LinkButton from './LinkButton';

it('should render an anchor link', () => {
	const actual = shallow(<LinkButton slug="Pizza" />);

	expect(actual).toMatchSnapshot();
});
