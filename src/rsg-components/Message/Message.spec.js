import React from 'react';
import { MessageRenderer } from './MessageRenderer';

it('renderer should render message', () => {
	const message = 'Hello *world*!';
	const actual = shallow(<MessageRenderer classes={{}}>{message}</MessageRenderer>);

	expect(actual).toMatchSnapshot();
});

it('renderer should render message for array', () => {
	const messages = ['Hello *world*!', 'Foo _bar_'];
	const actual = shallow(<MessageRenderer classes={{}}>{messages}</MessageRenderer>);

	expect(actual).toMatchSnapshot();
});
