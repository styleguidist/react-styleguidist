import React from 'react';
import { shallow } from 'enzyme'; // TODO: RTL
import IframeErrorRenderer from './IframeErrorRenderer';

it('renderer should render message', () => {
	const message = 'Hello *world*!';
	const actual = shallow(<IframeErrorRenderer message={message} />);

	expect(actual).toMatchSnapshot();
});
