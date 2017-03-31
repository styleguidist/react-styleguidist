import React from 'react';
import { WelcomeRenderer } from './WelcomeRenderer';

it('renderer should welcome screen', () => {
	const actual = shallow(
		<WelcomeRenderer classes={{}} />
	);

	expect(actual).toMatchSnapshot();
});
