import React from 'react';
import { WelcomeRenderer } from './WelcomeRenderer';

it('renderer should welcome screen with no components message', () => {
	const actual = shallow(
		<WelcomeRenderer classes={{}} components />
	);

	expect(actual).toMatchSnapshot();
});

it('renderer should welcome screen with no examples message', () => {
	const actual = shallow(
		<WelcomeRenderer classes={{}} examples />
	);

	expect(actual).toMatchSnapshot();
});
