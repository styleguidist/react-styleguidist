import React from 'react';
import { WelcomeRenderer } from './WelcomeRenderer';

it('renderer should render welcome screen', () => {
	const actual = shallow(<WelcomeRenderer classes={{}} patterns={['foo/*.js', 'bar/*.js']} />);

	expect(actual).toMatchSnapshot();
});
