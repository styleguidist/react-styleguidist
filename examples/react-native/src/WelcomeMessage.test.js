import renderer from 'react-test-renderer';

import React from 'react';
import WelcomeMessage from './WelcomeMessage';

it('renders without crashing', () => {
	const rendered = renderer.create(<WelcomeMessage />).toJSON();
	expect(rendered).toBeTruthy();
});
