import React from 'react';
import { MessageRenderer } from './MessageRenderer';

it('renderer should render message', () => {
	const message = 'Hello *world*!';
	const actual = shallow(
		<MessageRenderer classes={{}}>{message}</MessageRenderer>
	);

	expect(shallowToJson(actual)).toMatchSnapshot();
});
